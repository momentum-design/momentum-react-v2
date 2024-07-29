import { v4 as uuidV4 } from 'uuid';

/**
 * An event target to handle communication between instances of OverlayAlert and Popover.
 * This will enable us to keep track of Popover instances (specifically those with hideOnEsc = true)
 * which are opened while an OverlayAlert is rendered. While such Popover instances remain open, the OverlayAlert
 * will not close on Esc.
 *
 * This operates on the assumption that any Popover instance that is opened after an OverlayAlert is
 * rendered on the screen is part of the content of said OverlayAlert and should be closed before the OverlayAlert
 * itself.
 */

export enum EventType {
  TIPPY_INSTANCE_ADDED = 'tippyInstanceAdded',
  TIPPY_INSTANCE_REMOVED = 'tippyInstanceRemoved',
}

type CustomEventHandler = (event: CustomEvent) => void;
type EventHandler = (data?: unknown) => void;

const eventHandlers: Record<EventType, Record<string, CustomEventHandler>> = {
  [EventType.TIPPY_INSTANCE_ADDED]: {},
  [EventType.TIPPY_INSTANCE_REMOVED]: {},
};

/**
 * Event target used for Popover instances with hideOnEsc = true
 */
const eventTarget = new EventTarget();

/**
 * Dispatch a custom event to the event target.
 * @param eventType The category, allowing for listeners to listen to specific events
 * @param data The data associated with the event (provided in the custom event detail)
 */
const dispatchEvent = (eventType: EventType, data?: unknown): void => {
  eventTarget.dispatchEvent(new CustomEvent(eventType, { detail: { data } }));
};

/**
 * Add a listener for a specific type (category) of event.
 * This wraps the provided event handler to obfuscate the use of the custom event.
 * Due to this the event listener is stored against an ID which can be used to remove it later.
 * @param eventType The category of event
 * @param handler The handler function to call, expecting a type and data arguments
 * @returns The ID of the listener added
 */
const addListener = (eventType: EventType, handler: EventHandler): string => {
  const id = uuidV4();
  const eventHandler = ({ detail: { data } }: CustomEvent) => {
    handler(data);
  };

  eventTarget.addEventListener(eventType, eventHandler);
  eventHandlers[eventType][id] = eventHandler;

  return id;
};

/**
 * Remove a listener for a specific type (category) of event.
 * Removes the stored listener based on the event type and handler ID provided.
 * @param eventType The category of event
 * @param id The ID of the listener to be removed
 */
const removeListener = (eventType: EventType, id: string): void => {
  const eventHandler = eventHandlers[eventType][id];

  if (!eventHandler) {
    console.warn(`PopoverEvents:removeListener - No event handler found for ID: ${id}`);
    return;
  }

  eventTarget.removeEventListener(eventType, eventHandler);
  delete eventHandlers[eventType][id];
};

export { dispatchEvent, addListener, removeListener };
