import { useRef, useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { fetcher } from '../utils/helpers';

type GitHubUser = {
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
  site_admin: boolean;
  score: number;
  is_favorite: boolean;
};

export function useSearchGithubUsers() {
  const totalCountRef = useRef(0);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [items, setItems] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const handleSearch = async (text: string, customPage?: number) => {
    setLoading(true);
    const { items, total_count } = await fetcher(
      `/github/search/users?q=${text}&page=${
        customPage ?? page
      }&per_page=${perPage}`
    );
    totalCountRef.current = total_count;
    setItems(items || []);
    setLoading(false);
  };

  const handlePageChange = (type: 'next' | 'pre', text: string) => {
    let newPage = type === 'next' ? page + 1 : page - 1;
    if (newPage <= 0) newPage = 1;
    if (newPage > totalCountRef.current / perPage)
      newPage = totalCountRef.current;

    setPage(newPage);
    handleSearch(text, newPage);
  };

  const handleToggleFavorite = async (githubUsername: string) => {
    const { success } = await fetcher(
      `/users/${auth.phoneNumber}/favorite-github?githubUsername=${githubUsername}`,
      'POST'
    );

    if (success) {
      setItems((items) =>
        items.map((item) =>
          item.login === githubUsername
            ? { ...item, is_favorite: !item.is_favorite }
            : item
        )
      );
    }
  };

  return {
    items,
    loading,
    handleSearch,
    handlePageChange,
    handleToggleFavorite,
  };
}
