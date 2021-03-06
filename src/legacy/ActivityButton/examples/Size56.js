import React from 'react';
import { ActivityButton } from '@momentum-ui/react-collaboration';
export default function ActivityButtonSize56() {
  return (
    <div>
      <ActivityButton type="chat" size={56} onClick={() => {}} label="Chat" ariaLabel="Chat" />
      <ActivityButton
        type="camera"
        size={56}
        onClick={() => {}}
        label="Camera"
        ariaLabel="Camera"
      />
      <ActivityButton
        type="contact-card"
        size={56}
        onClick={() => {}}
        label="Contact Card"
        ariaLabel="Contact Card"
      />
      <ActivityButton
        type="meetings"
        size={56}
        onClick={() => {}}
        label="Meetings"
        ariaLabel="Meetings"
      />
      <ActivityButton
        type="whiteboard"
        size={56}
        onClick={() => {}}
        label="Whiteboard"
        ariaLabel="Whiteboard"
      />
      <ActivityButton type="files" size={56} onClick={() => {}} label="Files" ariaLabel="Files" />
      <ActivityButton
        type="share-screen"
        size={56}
        onClick={() => {}}
        label="Share"
        ariaLabel="Share"
      />
      <ActivityButton
        type="tasks"
        size={56}
        onClick={() => {}}
        label="Tasks"
        ariaLabel="Tasks"
        title="tasks"
      />
    </div>
  );
}
