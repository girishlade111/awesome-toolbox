import { Stagger, StaggerItem } from './Reveal';
import type { Resource } from '../../types';
import { ResourceCard } from './ResourceCard';

interface ResourceGridProps {
  resources: Resource[];
  startIndex?: number;
}

export function ResourceGrid({ resources, startIndex = 0 }: ResourceGridProps) {
  return (
    <Stagger className="dh-grid">
      {resources.map((r, i) => (
        <StaggerItem key={r.id}>
          <ResourceCard resource={r} index={startIndex + i} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
