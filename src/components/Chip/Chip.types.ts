import type { Chip } from '@momentum-design/components/dist/react';

// props type of chip
type MdcChipProps = React.ComponentProps<typeof Chip>;

export type Props = MdcChipProps & {
  stopPropagation?: boolean;
};
