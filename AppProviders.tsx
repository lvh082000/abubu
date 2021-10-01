import React from 'react';
import {DialogProvider} from 'components/Dialog';
import {SpinnerProvider} from 'components/Spinner';
import {ActionSheetProvider} from '@npt/react-native-action-sheet';
import {AppTourProvider} from 'components/AppTourProvider';
import {BottomSheetProvider} from 'components/BottomSheet';

const composeWrappers = (wrappers: React.FC[]) => {
  return wrappers.reduce((Acc, Current): React.FC => {
    return props => (
      <Current>
        <Acc {...props} />
      </Current>
    );
  });
};

const AppProviders: React.FC = ({children}) => {
  const Providers = composeWrappers([
    AppTourProvider as unknown as React.FC,
    DialogProvider,
    BottomSheetProvider as unknown as React.FC,
    ActionSheetProvider as unknown as React.FC,
    SpinnerProvider,
  ]);
  return <Providers>{children}</Providers>;
};

export default AppProviders;
