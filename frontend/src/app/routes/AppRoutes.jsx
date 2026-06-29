import { Route, Routes } from 'react-router-dom';

import DashboardPage from '../../pages/admin/DashboardPage';
import LoginPage from '../../pages/admin/LoginPage';
import FeedbackPage from '../../pages/public/FeedbackPage';
import NotFoundPage from '../../pages/NotFoundPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FeedbackPage />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;