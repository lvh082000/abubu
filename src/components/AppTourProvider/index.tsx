import {TourGuideProvider} from 'rn-tourguide';
import React from 'react';
import {Tooltip} from './components/Tooltip';

export const AppTourProvider = ({children}: {children: JSX.Element}) => {
  return (
    <TourGuideProvider
      tooltipComponent={Tooltip}
      androidStatusBarVisible={true}>
      {children}
    </TourGuideProvider>
  );
};
