import { default as ScreenReaderAnnouncer, announce } from './ScreenReaderAnnouncer';

import * as CONSTANTS from './ScreenReaderAnnouncer.constants';
import { AnnouncerProps } from './ScreenReaderAnnouncer.types';

export { CONSTANTS as SCREEN_READER_ANNOUNCER_CONSTANTS };

export type ScreenReaderAnnouncerProps = AnnouncerProps;

export { announce };

export default ScreenReaderAnnouncer;
