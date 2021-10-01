import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import Dialog from './Dialog';

export type DialogType =
  | 'Success'
  | 'Error'
  | 'Warning'
  | 'Confirmation'
  | 'Info'
  | undefined;

export interface DialogParams {
  message: string | undefined;
  type: DialogType;
  title?: string | undefined;
  onModalConfirm?: () => void;
  onModalClosed?: () => void;
  canCloseByBackdrop?: boolean;
}

interface DialogContextInterface {
  show: (params: DialogParams) => void;
  dismiss: () => void;
}

const initialState: DialogParams = {
  message: undefined,
  type: 'Info',
  title: undefined,
  onModalConfirm: () => {},
  onModalClosed: () => {},
  canCloseByBackdrop: true,
};

const DialogContext = createContext<DialogContextInterface>({
  show: () => {},
  dismiss: () => {},
});

export const DialogRef: DialogContextInterface = {
  show: () => {},
  dismiss: () => {},
};

export const useDialog = () => useContext(DialogContext);

export const DialogProvider: FC = ({children}) => {
  const [alertState, setAlertState] = React.useState(initialState);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    DialogRef.show = show;
    DialogRef.dismiss = dismiss;
  }, []);

  const show = useCallback(
    ({
      message,
      type,
      title,
      canCloseByBackdrop,
      onModalConfirm,
      onModalClosed,
    }: DialogParams) => {
      setAlertState({
        message,
        title,
        type,
        canCloseByBackdrop,
        onModalClosed,
        onModalConfirm,
      });
      setVisible(true);
    },
    [],
  );

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const onModalClosed = useCallback(() => {
    alertState.onModalClosed?.();
  }, [alertState.onModalClosed]);

  const onModalConfirm = useCallback(() => {
    alertState.onModalConfirm?.();
  }, [alertState.onModalConfirm]);

  const context = useMemo(() => {
    return {
      show,
      dismiss,
    };
  }, [show, dismiss]);

  return (
    <DialogContext.Provider value={context}>
      <Dialog
        message={alertState.message}
        type={alertState.type}
        title={alertState.title}
        visible={visible}
        canCloseByBackdrop={alertState.canCloseByBackdrop}
        onModalConfirm={onModalConfirm}
        onModalClosed={onModalClosed}
        onRequestClose={dismiss}
      />
      {children}
    </DialogContext.Provider>
  );
};
