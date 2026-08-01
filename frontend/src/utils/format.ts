import { format, parseISO, formatDistanceToNow } from 'date-fns';

/** Format release date: "Mar 15, 2024" */
export function formatReleaseDate(dateString: string | undefined | null): string {
  if (!dateString) return 'TBA';
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch {
    return 'TBA';
  }
}

/** Format year from date string: "2024" */
export function formatYear(dateString: string | undefined | null): string {
  if (!dateString) return '—';
  try {
    return format(parseISO(dateString), 'yyyy');
  } catch {
    return '—';
  }
}

/** Format runtime: "2h 15m" */
export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes) return '—';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/** Format rating to one decimal: "7.5" */
export function formatRating(rating: number | undefined | null): string {
  if (rating === undefined || rating === null) return '—';
  return rating.toFixed(1);
}

/** Format vote count: "1.2K", "3.4M" */
export function formatVoteCount(count: number | undefined | null): string {
  if (!count) return '0';
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

/** Format currency: "$150,000,000" */
export function formatCurrency(amount: number | undefined | null): string {
  if (!amount) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format relative time: "3 days ago" */
export function formatRelativeTime(dateString: string): string {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch {
    return '';
  }
}

/** Truncate text with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}
