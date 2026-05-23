import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,

            refetchOnWindowFocus: false,
            refetchOnReconnect: true,

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            retry: (failureCount, error: any) => {
                const status = error?.response?.status
                if (status >= 400 && status < 500) return false
                return failureCount < 2
            },

            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 3000), // Exponential backoff with a max delay of 3 seconds
        },

        mutations: {
            retry: false,
        },
    },
})
