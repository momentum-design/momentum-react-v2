import React from 'react';
import { ActivityButton } from '@momentum-ui/react-collaboration';
export default function ActivityButtonLarge() {
  return (
    <div>
      <ActivityButton type="chat" size={84} onClick={() => {}} label="Chat" ariaLabel="Chat" />
      <ActivityButton
        type="camera"
        size={84}
        onClick={() => {}}
        label="Camera"
        ariaLabel="Camera"
      />
      <ActivityButton
        type="meetings"
        size={84}
        onClick={() => {}}
        label="Meetings"
        ariaLabel="Meetings"
      />
      <ActivityButton
        type="whiteboard"
        size={84}
        onClick={() => {}}
        label="Whiteboard"
        ariaLabel="Whiteboard"
      />
      <ActivityButton type="files" size={84} onClick={() => {}} label="Files" ariaLabel="Files" />
      <ActivityButton
        type="share-screen"
        size={84}
        onClick={() => {}}
        label="Share"
        ariaLabel="Share"
      />
      <ActivityButton
        type="tasks"
        size={84}
        onClick={() => {}}
        label="Tasks"
        ariaLabel="Tasks"
        title="tasks"
      />
    </div>
  );
}
