import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { fetcher } from '../utils/helpers';

type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  message?: string;
};

export function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [githubUsers, setGithubUsers] = useState<GithubUser[]>([]);

  const fetchFavoriteGithubUsernames = async () => {
    setLoading(true);
    const { favoriteGithubUsers } = await auth.getUser();
    const { items } = await fetcher('/github/users', 'POST', {
      usernames: favoriteGithubUsers,
    });
    setGithubUsers(items || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchFavoriteGithubUsernames();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="mx-auto mt-10 mb-24 flex max-w-5xl flex-col items-center justify-center">
        <h3 className="text-center text-xl tracking-tight text-slate-300">
          {auth.phoneNumber}
        </h3>
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-white">
          My Favorite Github Users
        </h1>

        <div className="mt-5 w-full">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            githubUsers.map(
              (
                {
                  login,
                  avatar_url,
                  id,
                  followers,
                  public_repos,
                  html_url,
                  message,
                },
                index
              ) => (
                <div
                  key={index}
                  className="mt-5 flex w-full items-center justify-between rounded-lg border border-slate-50/10 p-5"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative mx-auto h-20 w-20 flex-none overflow-hidden rounded-full">
                      <img
                        className="h-full w-full"
                        src={avatar_url}
                        alt="avatar_img"
                      />
                    </div>
                    {message ? (
                      <p>{message}</p>
                    ) : (
                      <>
                        <a
                          className="text-xl text-sky-400"
                          href={html_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {login}
                        </a>
                        <p>id: {id}</p>
                        <p>followers: {followers}</p>
                        <p>public repos: {public_repos}</p>
                        <p>html url: {html_url}</p>
                      </>
                    )}
                  </div>
                </div>
              )
            )
          )}
        </div>
      </section>
    </div>
  );
}
