export type MessageLevel = 'error' | 'warning' | 'success' | 'none';

export interface Message {
  type: MessageLevel;
  message: string;
}

export interface Props {
  /**
   * Custom class to be able to override the component's CSS
   */
  className?: string;
  /**
   * message: the text to display
   */
  message?: string;
  /**
   * level: the severity of the message
   */
  level?: MessageLevel;
  /**
   * id: id of help message
   */
  id?: string;
}
