import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // Normalize icon name
  const cleanName = (name || '').trim();
  
  // @ts-expect-error - indexing dynamic icons
  const IconComponent = LucideIcons[cleanName] || LucideIcons[cleanName + 'Icon'] || LucideIcons.FileText;

  return <IconComponent {...props} />;
}
