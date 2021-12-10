import React from 'react';
import { CallControl } from '@momentum-ui/react-collaboration';
export default function CallControlActive() {
  return (
    <CallControl type="microphone-muted" active onClick={() => {}} ariaLabel="Mute microphone" />
  );
}
