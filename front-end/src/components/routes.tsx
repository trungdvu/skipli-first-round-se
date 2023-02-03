import { Route, Routes as ReactRoutersRoutes } from 'react-router-dom';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { Layout } from './layout';

export function Routes() {
  return (
    <ReactRoutersRoutes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </ReactRoutersRoutes>
  );
}
