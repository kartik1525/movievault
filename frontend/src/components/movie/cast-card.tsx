import { getProfileUrl } from '@/utils/image';
import type { CastMember } from '@/types/movie';

interface CastCardProps {
  member: CastMember;
}

export function CastCard({ member }: CastCardProps) {
  return (
    <div className="flex-shrink-0 w-32 group text-center">
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-cv-card border border-cv-border group-hover:border-cv-border-hover transition-colors mb-2.5 shadow-md">
        <img
          src={getProfileUrl(member.profile_path, 'w185')}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h4 className="text-xs font-semibold text-cv-text line-clamp-1 group-hover:text-cv-accent transition-colors">
        {member.name}
      </h4>
      <p className="text-[11px] text-cv-text-tertiary line-clamp-1 mt-0.5">
        {member.character}
      </p>
    </div>
  );
}
