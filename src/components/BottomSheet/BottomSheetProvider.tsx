import * as React from 'react';
import {Keyboard} from 'react-native';
import BottomSheet from './components/BottomSheet';
import {BottomSheetProps} from './types';

interface Props {
  children: React.ReactNode;
}

const Context = React.createContext<BottomSheetProps>({
  showBottomSheet: (component: JSX.Element) => {},
  dismissBottomSheet: () => {},
});

export function useBottomSheet() {
  return React.useContext(Context);
}

export default class BottomSheetProvider extends React.Component<Props> {
  _bottomSheetRef: React.RefObject<BottomSheet>;

  constructor(props: Props) {
    super(props);
    this._bottomSheetRef = React.createRef();
  }

  getContext = () => {
    return {
      showBottomSheet: (component: JSX.Element) => {
        Keyboard.dismiss();
        this._bottomSheetRef.current !== null &&
          this._bottomSheetRef.current.showBottomSheet(component);
      },
      dismissBottomSheet: () => {
        this._bottomSheetRef.current !== null &&
          this._bottomSheetRef.current.dismissBottomSheet();
      },
    };
  };

  render() {
    return (
      <Context.Provider value={this.getContext()}>
        <BottomSheet ref={this._bottomSheetRef}>
          {React.Children.only(this.props.children)}
        </BottomSheet>
      </Context.Provider>
    );
  }
}
