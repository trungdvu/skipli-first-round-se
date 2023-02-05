import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { ProfilePage } from '../pages/profile-page';
import { Layout } from './layout';
import { RequiredAuth } from './required-auth';

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <RequiredAuth>
              <HomePage />
            </RequiredAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequiredAuth>
              <ProfilePage />
            </RequiredAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </ReactRouterRoutes>
  );
}
