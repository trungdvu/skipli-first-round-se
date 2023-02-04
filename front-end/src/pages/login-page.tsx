import cn from 'classnames';
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

export function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('+84986835611');
  const [verifyCode, setVerifyCode] = useState('');
  const [isSentCode, setIsSentCode] = useState(false);
  const [loading, setLoading] = useState({
    sendingCode: false,
    submitting: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleChange = useCallback(
    (callback: React.Dispatch<React.SetStateAction<string>>) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        callback(event.currentTarget.value);
      },
    []
  );

  const handleLoading = useCallback(
    (key: 'sendingCode' | 'submitting', value: boolean) => {
      setLoading((pre) => ({ ...pre, [key]: value }));
    },
    []
  );

  const handleSendCode = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleLoading('sendingCode', true);
      const result = await auth.createAccessCode(phoneNumber);
      result && setIsSentCode(true);
      handleLoading('sendingCode', false);
    },
    [handleLoading, auth, phoneNumber]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleLoading('submitting', true);
      const result = await auth.validateAccessCode(phoneNumber, verifyCode);
      result && navigate(from, { replace: true });
      handleLoading('submitting', false);
    },
    [auth, from, handleLoading, navigate, phoneNumber, verifyCode]
  );

  return (
    <div className="min-h-screen">
      <section className="flex max-w-5xl flex-col items-center pt-32">
        <h1 className="text-center text-6xl font-extrabold tracking-tight text-white">
          <span className="text-[#ec1500]">SKIPLI</span> FIRST ROUND SE
        </h1>

        <form
          className="mt-6 flex w-full max-w-md space-x-5"
          onSubmit={handleSendCode}
        >
          <input
            className="h-14 flex-1 rounded-lg bg-slate-800 p-5 text-slate-300 shadow-sm transition duration-75 placeholder:text-slate-600 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none"
            placeholder="+84986415726"
            value={phoneNumber}
            onChange={handleChange(setPhoneNumber)}
          />
          <button
            className="rounded-lg border border-slate-700 px-5 font-semibold text-sky-500 hover:bg-slate-700 focus:outline-none active:bg-slate-600"
            type="submit"
          >
            {loading.sendingCode ? 'Sending...' : 'Get code'}
          </button>
        </form>

        <form
          className="mt-6 flex w-full max-w-md flex-col space-y-5"
          onSubmit={handleSubmit}
        >
          <input
            className={cn(
              'h-14 flex-1 rounded-lg bg-slate-800 p-5 text-slate-300 shadow-sm transition duration-75 placeholder:text-slate-600',
              { 'hover:bg-slate-700 focus:outline-none': isSentCode },
              { 'opacity-30': !isSentCode }
            )}
            disabled={!isSentCode}
            placeholder="Verify code"
            value={verifyCode}
            onChange={handleChange(setVerifyCode)}
          />
          <button
            className={cn(
              'flex h-14 w-full items-center justify-center rounded-lg bg-sky-500 px-6 font-semibold text-white',
              { 'hover:bg-sky-400 focus:outline-none': isSentCode },
              { 'bg-opacity-30 text-gray-200': !isSentCode }
            )}
            disabled={!isSentCode}
            type="submit"
          >
            {loading.submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </section>
    </div>
  );
}
