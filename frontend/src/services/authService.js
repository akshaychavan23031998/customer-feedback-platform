import { mockAdminLogin } from '../utils/auth.mock';

export async function loginAdmin(credentials) {
  return mockAdminLogin(credentials);
}