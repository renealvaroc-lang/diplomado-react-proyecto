import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, NotFoundPage, UserPage } from '../pages/public';
import { PerfilPage, TaskPage, CreateTaskPage, EditTaskPage } from '../pages/private';
import { PrivateLayout } from '../layouts/PrivateLayout';
import { PublicRoute } from './PublicRouter';

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>

        {/* RUTAS PÚBLICAS */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>

        {/* RUTAS PRIVADAS */}
        <Route element={<PrivateLayout />}>
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/tasks/create" element={<CreateTaskPage />} />
          <Route path="/tasks/edit/:id" element={<EditTaskPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </HashRouter>
  );
};