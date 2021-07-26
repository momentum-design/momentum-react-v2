export type MessageLevel = 'error' | 'warning' | 'success' | 'none';

export interface Props {
  /**
   * message: the text to display
   */
  message?: string;
  /**
   * level: the severity of the message
   */
  level?: MessageLevel;
}
