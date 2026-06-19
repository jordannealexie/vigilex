import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

// Query hooks
export function useQueryWithAuth<T>(
  key: string[],
  endpoint: string,
  options?: { enabled?: boolean }
) {
  const { user } = useAuth();

  return useQuery({
    queryKey: key,
    queryFn: () => apiClient<T>(endpoint),
    enabled: !!user && options?.enabled !== false,
    staleTime: 30 * 1000,
  });
}

// Mutation hooks with toast
export function useMutationWithToast<T, V>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST',
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    successMessage?: string;
    errorMessage?: string;
    invalidateKeys?: string[][];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: V) => {
      return apiClient<T>(endpoint, {
        method,
        body: JSON.stringify(variables),
      });
    },
    onSuccess: (data) => {
      if (options?.successMessage) {
        toast.success(options.successMessage);
      }
      if (options?.invalidateKeys) {
        options.invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      toast.error(options?.errorMessage || error.message);
      options?.onError?.(error);
    },
  });
}