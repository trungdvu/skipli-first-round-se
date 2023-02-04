import { Routes } from './components/routes';
import { AuthProvider } from './contexts/auth-context';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
