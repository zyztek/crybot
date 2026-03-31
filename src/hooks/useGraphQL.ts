/**
 * useGraphQL Hook
 *
 * React hook for executing GraphQL queries and mutations
 * Provides loading, error, and data states
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { graphqlQuery, graphqlMutation, GraphQLResponse, GraphQLVariables } from '../services/graphql';

interface UseGraphQLState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseGraphQLOptions {
  immediate?: boolean;
  variables?: GraphQLVariables;
}

/**
 * Hook for executing GraphQL queries
 */
export function useGraphQLQuery<T>(
  query: string,
  options: UseGraphQLOptions = {}
): UseGraphQLState<T> & {
  execute: (vars?: GraphQLVariables) => Promise<void>;
  refetch: () => Promise<void>;
} {
  const { immediate = false, variables = {} } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const variablesRef = useRef(variables);

  const execute = useCallback(async (vars?: GraphQLVariables) => {
    setLoading(true);
    setError(null);
    
    const currentVars = vars ?? variablesRef.current;
    
    try {
      const response = await graphqlQuery<T>(query, currentVars);
      
      if (response.errors && response.errors.length > 0) {
        throw new Error(response.errors[0].message);
      }
      
      setData(response.data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [query]);

  const refetch = useCallback(async () => {
    await execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, execute, refetch };
}

/**
 * Hook for executing GraphQL mutations
 */
export function useGraphQLMutation<T>(
  mutation: string,
  options: UseGraphQLOptions = {}
): UseGraphQLState<T> & {
  execute: (vars?: GraphQLVariables) => Promise<T | null>;
  reset: () => void;
} {
  const { immediate = false, variables = {} } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const variablesRef = useRef(variables);

  const execute = useCallback(async (vars?: GraphQLVariables): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    const currentVars = vars ?? variablesRef.current;
    
    try {
      const response = await graphqlMutation<T>(mutation, currentVars);
      
      if (response.errors && response.errors.length > 0) {
        throw new Error(response.errors[0].message);
      }
      
      const result = response.data ?? null;
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [mutation]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
}

/**
 * Hook for executing both queries and mutations with a unified interface
 */
export function useGraphQL<T>(
  queryOrMutation: string,
  options: UseGraphQLOptions & { isMutation?: boolean } = {}
): UseGraphQLState<T> & {
  execute: (vars?: GraphQLVariables) => Promise<void | T | null>;
  refetch: () => Promise<void>;
  reset: () => void;
} {
  const { immediate = false, variables = {}, isMutation = false } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const variablesRef = useRef(variables);

  const execute = useCallback(async (vars?: GraphQLVariables): Promise<void | T | null> => {
    setLoading(true);
    setError(null);
    
    const currentVars = vars ?? variablesRef.current;
    
    try {
      let response: GraphQLResponse<T>;
      
      if (isMutation) {
        response = await graphqlMutation<T>(queryOrMutation, currentVars);
      } else {
        response = await graphqlQuery<T>(queryOrMutation, currentVars);
      }
      
      if (response.errors && response.errors.length > 0) {
        throw new Error(response.errors[0].message);
      }
      
      const result = response.data ?? null;
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [queryOrMutation, isMutation]);

  const refetch = useCallback(async () => {
    if (!isMutation) {
      await execute();
    }
  }, [execute, isMutation]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (immediate && !isMutation) {
      execute();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, execute, refetch, reset };
}

export default {
  useGraphQLQuery,
  useGraphQLMutation,
  useGraphQL,
};