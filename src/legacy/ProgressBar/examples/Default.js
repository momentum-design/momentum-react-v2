import React from 'react';
import { ProgressBar } from '@momentum-ui/react-collaboration';

export default function ProgressBarDefault() {
  return (
    <div className="columns small-6">
      <ProgressBar label="ProgressBar Default" min={0} max={100} value={50} />
    </div>
  );
}
