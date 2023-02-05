import cn from 'classnames';
import { useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { useSearchGithubUsers } from '../hooks/use-search-github-users';

export function HomePage() {
  const [searchText, setSearchText] = useState('');
  const { phoneNumber } = useAuth();
  const {
    items,
    loading,
    handleSearch,
    handlePageChange,
    handleToggleFavorite,
  } = useSearchGithubUsers();

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
        {items.map(({ login, avatar_url, type, is_favorite }) => (
          <div
            key={login}
            className="relative overflow-hidden rounded-lg bg-slate-800 p-8 text-center"
          >
            <button
              className="absolute right-5 top-5"
              onClick={() => handleToggleFavorite(login)}
            >
              <svg
                className={cn('h-6 w-6  fill-none active:animate-ping', {
                  'fill-sky-400 text-sky-400': is_favorite,
                  'text-slate-500': !is_favorite,
                })}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

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
