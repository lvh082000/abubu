import {EventEmitter} from 'events';
import {useEffect} from 'react';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

export const useEventEmiiter = (
  eventName: string,
  callback: (payload?: any) => void,
) => {
  useEffect(() => {
    myEmitter.on(eventName, callback);
    return () => {
      myEmitter.off(eventName, () => {});
    };
  }, []);
};

export const triggerEvent = (eventName: string, data?: any) =>
  myEmitter.emit(eventName, data);
