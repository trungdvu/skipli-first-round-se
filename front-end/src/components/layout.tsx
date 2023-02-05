import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

export function Layout() {
  const { phoneNumber } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const signout = () => {
    localStorage.setItem('phoneNumber', '');
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen">
      {phoneNumber && location.pathname !== '/login' ? (
        <nav className="flex h-20 items-center justify-between bg-slate-800 px-24">
          <Link to={'/'}>
            <h1 className="cursor-pointer text-2xl font-extrabold text-white">
              <span className="text-[#ec1500]">SKIPLI</span> FIRST ROUND SE
            </h1>
          </Link>
          <div className="flex items-center justify-between space-x-5">
            <Link to={'/profile'}>
              <span className="flex cursor-pointer items-center justify-start overflow-hidden rounded-lg text-white hover:underline">
                {phoneNumber}
              </span>
            </Link>

            <button onClick={signout}>
              <span className="flex cursor-pointer items-center justify-start overflow-hidden rounded-lg text-white hover:underline">
                Log out
              </span>
            </button>
          </div>
        </nav>
      ) : null}

      <Outlet />
    </div>
  );
}
