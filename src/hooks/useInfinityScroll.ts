import { useEffect, useState, useCallback, useRef } from 'react'

interface UseInfiniteScrollProps<T> {
  fetchFn: (page: number) => Promise<{ data: T[]; hasMore: boolean }>
  initialData?: T[]
}

export function useInfiniteScroll<T>({
  fetchFn,
  initialData = [],
}: UseInfiniteScrollProps<T>) {
  const [data, setData] = useState<T[]>(initialData)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const observerTarget = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchFn(page)
      setData(prev => [...prev, ...result.data])
      setHasMore(result.hasMore)
      setPage(prev => prev + 1)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [page, isLoading, hasMore, fetchFn])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 1, rootMargin: '100px' }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [loadMore, hasMore, isLoading])

  const reset = () => {
    setData(initialData)
    setPage(1)
    setHasMore(true)
    setError(null)
  }

  return { data, isLoading, hasMore, error, loadMore, reset, observerTarget }
}