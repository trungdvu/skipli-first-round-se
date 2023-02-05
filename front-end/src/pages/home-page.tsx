import cn from 'classnames';
import { useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { useSearchGithubUsers } from '../hooks/use-search-github-users';

export function HomePage() {
  const [searchText, setSearchText] = useState('');
  const { phoneNumber } = useAuth();
  const { items, loading, handleSearch, handlePageChange } =
    useSearchGithubUsers();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await handleSearch(searchText);
  };

  return (
    <div className="min-h-screen">
      <nav className="flex h-20 items-center justify-between bg-slate-800 px-24">
        <h1 className="text-2xl font-extrabold text-white">Skipli</h1>
        <div className="flex h-14 w-14 items-center justify-start overflow-hidden rounded-lg text-white">
          {phoneNumber}
        </div>
      </nav>

      <section className="mx-auto mt-5 flex max-w-4xl flex-col items-center justify-center">
        <form
          className="flex w-full max-w-md justify-center space-x-5"
          onSubmit={handleSubmit}
        >
          <input
            className="h-14 flex-1 rounded-lg bg-slate-800 p-5 text-slate-300 shadow-sm transition duration-75 placeholder:text-slate-500 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none"
            placeholder="Search Github Users..."
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
          />
          <button
            className="rounded-lg border border-slate-700 px-5 font-semibold text-sky-500 hover:bg-slate-700 focus:outline-none active:bg-slate-600"
            type="submit"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </section>

      <section className="mx-auto mt-5 grid max-w-4xl gap-5 px-5 sm:grid-cols-3 md:grid-cols-4">
        {items.map(({ login, avatar_url, type }) => (
          <div
            key={login}
            className={cn(
              'rounded-lg overflow-hidden bg-slate-800 highlight-white/5 p-8 text-center'
            )}
          >
            <div className="relative mx-auto h-24 w-24 flex-none overflow-hidden rounded-full">
              <img
                className="h-full w-full"
                src={avatar_url}
                alt="avatar_img"
              />
            </div>

            <div className="mt-8 flex flex-col items-center font-medium">
              <h5 className="text-lg text-sky-400 transition-colors duration-500">
                {login}
              </h5>
              <p className="text-slate-500 transition-colors duration-500">
                {type}
              </p>
            </div>
          </div>
        ))}
      </section>

      {items.length ? (
        <div className="mt-5 mb-24 flex w-full items-center justify-center">
          <ul className="inline-flex space-x-px">
            <li>
              <button
                className="ml-0 w-24 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => handlePageChange('pre', searchText)}
              >
                Previous
              </button>
            </li>
            <li>
              <button
                className="w-24 rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => handlePageChange('next', searchText)}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
