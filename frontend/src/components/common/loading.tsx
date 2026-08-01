import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton', className)} aria-hidden="true" />;
}

/** Skeleton for a movie card poster */
export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      <Skeleton className="w-full aspect-[2/3] rounded-xl" />
      <div className="flex flex-col gap-1.5 px-1">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}

/** Skeleton row of movie cards */
export function MovieRowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-[180px]">
          <MovieCardSkeleton />
        </div>
      ))}
    </div>
  );
}

/** Skeleton for the hero section */
export function HeroSkeleton() {
  return (
    <div className="relative w-full h-[70vh] min-h-[500px]" aria-hidden="true">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="absolute bottom-0 left-0 right-0 p-8 page-container">
        <div className="flex flex-col gap-4 max-w-xl">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-10 w-96 rounded-lg" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
          <div className="flex gap-3 mt-2">
            <Skeleton className="h-11 w-32 rounded-xl" />
            <Skeleton className="h-11 w-32 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Skeleton for movie detail page */
export function DetailSkeleton() {
  return (
    <div className="page-container pt-24" aria-hidden="true">
      <div className="flex flex-col md:flex-row gap-8">
        <Skeleton className="w-64 aspect-[2/3] rounded-xl flex-shrink-0" />
        <div className="flex flex-col gap-4 flex-1">
          <Skeleton className="h-8 w-3/4 rounded" />
          <Skeleton className="h-4 w-1/3 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      </div>
    </div>
  );
}

/** Skeleton for text content */
export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4 rounded',
            i === lines - 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}
