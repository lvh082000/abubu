import {DependencyList, useEffect} from 'react';
import {BackHandler} from 'react-native';

export const useAndroidBack = (action: () => void, deps?: DependencyList) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        if (action) {
          action();
          /**
           * When true is returned the event will not be bubbled up
           * & no other back action will execute
           */
          return true;
        }
        /**
         * Returning false will let the event to bubble up & let other event listeners
         * or the system's default back action to be executed.
         */
        return false;
      },
    );

    return () => backHandler.remove();
  }, deps);
};
