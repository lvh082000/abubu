import Button from 'components/Button';
import GradientButton from 'components/GradientButton';
import React, {useCallback, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import {l} from 'styles/shared';
import {ProductIntentoryItem} from 'types/Properties';
import CheckingModal, {CheckingModalRef} from './CheckingModal';
import InventoryList from './InventoryList';

interface Props {
  products: Array<ProductIntentoryItem>;
  onComplete: () => void;
  onTemporary: () => void;
  onResult: (data: {id: number; value: number}) => void;
  onDeleteItem?: (item: ProductIntentoryItem) => void;
}

const ListCheck = ({
  products,
  onComplete,
  onTemporary,
  onResult,
  onDeleteItem,
}: Props) => {
  const modalRef = useRef<CheckingModalRef>(null);

  const onPressItem = useCallback(product => {
    modalRef.current?.open(product);
  }, []);

  return (
    <>
      <View style={l.flex}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          style={l.flex}>
          <InventoryList
            onPressItem={onPressItem}
            onDeleteItem={onDeleteItem}
            data={products}
          />
        </ScrollView>
        <View style={[l.mx20, l.pt10, l.mb30]}>
          <GradientButton
            onPress={onComplete}
            variant="primary"
            title="HOÀN THÀNH"
          />
          <Button
            onPress={onTemporary}
            widgetStyles={{container: [l.mb10, l.mt10]}}
            size="sm"
            title="LƯU TẠM"
          />
        </View>
      </View>
      <CheckingModal onResult={onResult} ref={modalRef} />
    </>
  );
};

export default React.memo(ListCheck);
