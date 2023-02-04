import React from 'react';
import { API_BASE } from '../config/api';

type Options = {
  strict?: boolean;
  errorMessage?: string;
  name?: string;
};

export function createContext<T>(defaultValue: T, options: Options = {}) {
  const {
    strict = true,
    errorMessage = 'useContext must be inside a Provider with a value',
    name,
  } = options;
  const Context = React.createContext<T>(defaultValue);

  function useContext() {
    const context = React.useContext(Context);

    if (!context && strict) {
      throw Error(errorMessage);
    }

    return context;
  }

  Context.displayName = name;

  return [Context.Provider, useContext] as const;
}

export async function fetcher(
  url: string,
  method: 'GET' | 'POST' = 'GET',
  data = undefined
) {
  const res = await fetch(`${API_BASE}/${url}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (res.status > 399 && res.status < 200) {
    throw new Error('Fetcher error');
  }

  return res.json();
}
