import Constants from 'config/Constants';
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import Container from './SelectProducts';

interface Params {
  onSelected: (ids: Array<number>) => void;
  selectedPrice?: number;
  numberOfSelected?: number;
}

interface SelectProductContextInterface {
  show: (params: Params) => void;
  dismiss: () => void;
}

const SelectProductsContext = createContext<SelectProductContextInterface>({
  show: () => {},
  dismiss: () => {},
});

export const useSelectProducts = () => useContext(SelectProductsContext);

export const SelectProductsProvider: FC = ({children}) => {
  const [visible, setVisible] = React.useState(false);
  const [queryParams, setQueryParams] = useState({
    selectedPrice: Constants.DefaultPrice.id,
    numberOfSelected: 0,
  });
  let _onSelected: Function;

  const show = useCallback(
    ({onSelected, selectedPrice, numberOfSelected}: Params) => {
      _onSelected = onSelected;
      setVisible(true);
      setQueryParams({
        selectedPrice: selectedPrice ?? Constants.DefaultPrice.id,
        numberOfSelected: numberOfSelected ?? 0,
      });
    },
    [],
  );

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const context = useMemo(() => {
    return {
      show,
      dismiss,
    };
  }, [show, dismiss]);

  const onModalClosed = useCallback(ids => {
    _onSelected(ids);
  }, []);

  return (
    <SelectProductsContext.Provider value={context}>
      <Container
        visible={visible}
        onModalClosed={onModalClosed}
        dismiss={dismiss}
        selectedPrice={queryParams.selectedPrice}
        numberOfSelected={queryParams.numberOfSelected}
      />
      {children}
    </SelectProductsContext.Provider>
  );
};
