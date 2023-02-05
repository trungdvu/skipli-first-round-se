import { ReactNode, useCallback, useState } from 'react';
import { createContext, fetcher } from '../utils/helpers';

type AuthContextType = {
  phoneNumber: string;
  createAccessCode: (phoneNumber: string) => Promise<boolean>;
  validateAccessCode: (phoneNumber: string, code: string) => Promise<boolean>;
  getUser: () => Promise<{ accessCode: string; favoriteGithubUsers: string[] }>;
};

const [Provider, useAuth] = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: ReactNode }) {
  const [phoneNumber, setPhoneNumber] = useState<string>(
    localStorage.getItem('phoneNumber') || ''
  );

  const createAccessCode = useCallback(
    async (phoneNumber: string): Promise<boolean> => {
      const { success } = await fetcher(
        `auth/access-code/${phoneNumber}`,
        'POST'
      );
      return success;
    },
    []
  );

  const validateAccessCode = useCallback(
    async (phoneNumber: string, code: string): Promise<any> => {
      const { success } = await fetcher(
        `auth/access-code/${phoneNumber}/validation?accessCode=${code}`,
        'POST'
      );

      if (success) {
        setPhoneNumber(phoneNumber);
        localStorage.setItem('phoneNumber', phoneNumber);
      }

      return success;
    },
    []
  );

  const getUser = async () => {
    const { data } = await fetcher(`/users/${phoneNumber}`);

    return data;
  };

  return (
    <Provider
      value={{ phoneNumber, createAccessCode, validateAccessCode, getUser }}
    >
      {children}
    </Provider>
  );
}

export { useAuth, AuthProvider };
