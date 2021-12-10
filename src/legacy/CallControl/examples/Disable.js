import React from 'react';
import { CallControl } from '@momentum-ui/react-collaboration';
export default function CallControlDisabled() {
  return (
    <CallControl type="microphone-muted" disabled onClick={() => {}} ariaLabel="Mute microphone" />
  );
}
