export type MessageLevel = 'error' | 'warning' | 'success' | 'help' | 'none';

export interface Message {
  level: MessageLevel;
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
