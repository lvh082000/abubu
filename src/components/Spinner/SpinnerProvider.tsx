import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import Spinner from './Spinner';

export interface SpinnerParams {
  title?: string | undefined;
}

interface SpinnerContextInterface {
  show: (params?: SpinnerParams) => void;
  dismiss: () => void;
  visible?: boolean;
}

const initialState: SpinnerParams = {
  title: undefined,
};

const SpinnerContext = createContext<SpinnerContextInterface>({
  show: () => {},
  dismiss: () => {},
  visible: false,
});

export const SpinnerRef: SpinnerContextInterface = {
  show: () => {},
  dismiss: () => {},
};

export const useSpinner = () => useContext(SpinnerContext);

export const useSpinnerState = () => {
  const spinner = useContext(SpinnerContext);
  return spinner.visible;
};

export const SpinnerProvider: FC = ({children}) => {
  const [state, setState] = React.useState(initialState);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    SpinnerRef.show = show;
    SpinnerRef.dismiss = dismiss;
  }, []);

  const show = useCallback((params?: SpinnerParams) => {
    params && setState(params);
    setVisible(true);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const context = useMemo(() => {
    return {
      show,
      dismiss,
      visible,
    };
  }, [show, dismiss, visible]);

  return (
    <SpinnerContext.Provider value={context}>
      <Spinner title={state.title} visible={visible} />
      {children}
    </SpinnerContext.Provider>
  );
};
