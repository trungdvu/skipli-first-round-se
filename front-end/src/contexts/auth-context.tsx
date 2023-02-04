import { ReactNode, useCallback, useState } from 'react';
import { createContext, fetcher } from '../utils/helpers';

type AuthContextType = {
  phoneNumber: string;
  createAccessCode: (phoneNumber: string) => Promise<boolean>;
  validateAccessCode: (phoneNumber: string, code: string) => Promise<boolean>;
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
        localStorage.setItem('phoneNumber', JSON.stringify(phoneNumber));
      }

      return success;
    },
    []
  );

  return (
    <Provider value={{ phoneNumber, createAccessCode, validateAccessCode }}>
      {children}
    </Provider>
  );
}

export { useAuth, AuthProvider };
