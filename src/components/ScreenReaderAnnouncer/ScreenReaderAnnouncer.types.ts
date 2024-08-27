import { ReactNode } from 'react';

type Level = 'assertive' | 'polite';
export interface CompoundProps {
  announce: ScreenReaderAnnouncerAnnounce;
}

type AnnounceOptions = {
  /**
   * A message to announce with a screen reader
   */
  body: ReactNode;
  /**
   * The aria-live value for the announcement
   * Defaults to "polite"
   */
  level?: Level;
  /**
   * The time in ms between triggering an announcement, and the announcement being available in the DOM
   * Avoids issues with browser compatibility (see https://patrickhlauke.github.io/aria/tests/live-regions/)
   * Defaults to 150
   */
  delay?: number;
  /**
   * The time in ms between the announcement being available in the DOM and it being removed
   * Should be a large enough number for the entire announcement to be read out
   * Defaults to 20,000
   */
  timeout?: number;
};
type ScreenReaderAnnouncerAnnounce = (options: AnnounceOptions, announcerIdentity?: string) => void;
type Announce = (options: AnnounceOptions) => void;
type Clear = (options: { messageIdentity: string }) => void;
type Message = {
  messageIdentity: string;
  body: ReactNode;
  level: Level;
  delay: number;
  timeout: number;
};
type AnnouncementProps = {
  identity: string;
  body: ReactNode;
  level: Level;
  delay: number;
  timeout: number;
  clear: Clear;
};
type AnnouncerProps = { identity?: string };

export type {
  ScreenReaderAnnouncerAnnounce,
  Level,
  AnnounceOptions,
  Announce,
  Clear,
  Message,
  AnnouncementProps,
  AnnouncerProps,
};
