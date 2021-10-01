import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import {PartnerType} from 'types/Properties';
import Container from './SelectPartners';

interface Params {
  onSelected: (id: number | undefined) => void;
  type: PartnerType;
}

interface SelectPartnersContextInterface {
  show: (params: Params) => void;
  dismiss: () => void;
}

const SelectPartnersContext = createContext<SelectPartnersContextInterface>({
  show: () => {},
  dismiss: () => {},
});

export const useSelectPartners = () => useContext(SelectPartnersContext);

export const SelectPartnersProvider: FC = ({children}) => {
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState<PartnerType>('guest');
  let _onSelected: Function;

  const show = useCallback(({type, onSelected}: Params) => {
    _onSelected = onSelected;
    setVisible(true);
    setType(type);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const context = useMemo(() => {
    return {
      show,
      dismiss,
    };
  }, [show, dismiss]);

  const onModalClosed = useCallback(id => {
    _onSelected(id);
  }, []);

  return (
    <SelectPartnersContext.Provider value={context}>
      <Container
        visible={visible}
        onModalClosed={onModalClosed}
        dismiss={dismiss}
        type={type}
      />
      {children}
    </SelectPartnersContext.Provider>
  );
};
