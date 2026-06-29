import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, LogIn, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import FormFieldError from '../../components/common/FormFieldError';
import { loginAdmin } from '../../services/authService';
import { setStoredAuth } from '../../utils/authStorage';
import { loginFormSchema } from '../../utils/validationSchemas';

const defaultValues = {
  email: '',
  password: '',
};

function LoginPage() {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState({
    type: '',
    message: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  async function onSubmit(formValues) {
    try {
      setAuthState({ type: '', message: '' });

      const response = await loginAdmin(formValues);

      if (!response.success) {
        setAuthState({
          type: 'error',
          message: response.message || 'Invalid email or password.',
        });
        return;
      }

      setStoredAuth({
        token: response.data.token,
        user: response.data.user,
      });

      setAuthState({
        type: 'success',
        message: 'Login successful. Redirecting to dashboard...',
      });

      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 500);
    } catch (error) {
      setAuthState({
        type: 'error',
        message: error.message || 'Unable to login. Please try again.',
      });
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Admin Console
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Sign in to dashboard
        </h1>

        <p className="mt-3 text-slate-600">
          Access the feedback analytics dashboard using admin credentials.
        </p>

        <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-semibold">Demo credentials</p>
          <p className="mt-1">Email: admin@acowale.test</p>
          <p>Password: password123</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email address
            </label>

            <div className="relative mt-2">
              <Mail
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@acowale.test"
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                {...register('email')}
              />
            </div>

            <FormFieldError message={errors.email?.message} />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter password"
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                {...register('password')}
              />
            </div>

            <FormFieldError message={errors.password?.message} />
          </div>

          {authState.message ? (
            <div
              className={`rounded-xl px-4 py-3 text-sm ${
                authState.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {authState.message}
            </div>
          ) : null}

          <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full gap-2">
            <LogIn size={18} />
            Sign in
          </Button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;