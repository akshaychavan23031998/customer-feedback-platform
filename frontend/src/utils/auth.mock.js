export const MOCK_ADMIN_CREDENTIALS = {
  email: 'admin@acowale.test',
  password: 'password123',
};

export async function mockAdminLogin({ email, password }) {
  await new Promise((resolve) => {
    setTimeout(resolve, 700);
  });

  const isValidCredentials =
    email === MOCK_ADMIN_CREDENTIALS.email &&
    password === MOCK_ADMIN_CREDENTIALS.password;

  if (!isValidCredentials) {
    return {
      success: false,
      message: 'Invalid email or password.',
      data: null,
    };
  }

  return {
    success: true,
    message: 'Login successful.',
    data: {
      token: 'mock-admin-jwt-token',
      user: {
        id: 'admin_001',
        name: 'Acowale Admin',
        email: MOCK_ADMIN_CREDENTIALS.email,
        role: 'admin',
      },
    },
  };
}