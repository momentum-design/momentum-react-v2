import React from 'react';
import { ActivityButton } from '@momentum-ui/react-collaboration';
export default function ActivityButtonDefault() {
  return (
    <div>
      <ActivityButton type="chat" onClick={() => {}} label="Chat" ariaLabel="Chats" />
      <ActivityButton type="camera" onClick={() => {}} label="Camera" ariaLabel="Camera" />
      <ActivityButton type="meetings" onClick={() => {}} label="Meetings" ariaLabel="Meetings" />
      <ActivityButton
        type="whiteboard"
        onClick={() => {}}
        label="Whiteboard"
        ariaLabel="Whiteboard"
      />
      <ActivityButton type="files" onClick={() => {}} label="Files" ariaLabel="Files" />
      <ActivityButton type="share-screen" onClick={() => {}} label="Share" ariaLabel="Share" />
      <ActivityButton type="tasks" onClick={() => {}} label="Tasks" ariaLabel="Tasks" />
    </div>
  );
}
