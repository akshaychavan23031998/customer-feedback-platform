const AUTH_TOKEN_KEY = 'acowale_admin_token';
const AUTH_USER_KEY = 'acowale_admin_user';

export function getStoredAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredAuthUser() {
  const storedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    clearStoredAuth();
    return null;
  }
}

export function setStoredAuth({ token, user }) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export function isAdminAuthenticated() {
  return Boolean(getStoredAuthToken() && getStoredAuthUser());
}