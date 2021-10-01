import GradientButton from 'components/GradientButton';
import {GradientHeader} from 'components/Header';
import OrderInfo, {OrderInfoRow} from '../components/OrderInfo';
import SelectProductsOrScanQRCode from 'components/SelectProductsOrScanQRCode';
import React, {useCallback, useRef, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {c, l} from 'styles/shared';
import NavigationService from 'services/NavigationService';
import {
  ImportedProductType,
  ImportStatusType,
  SelectedProductType,
} from 'types/Properties';
import {OrderService} from 'services/OrderService';
import {useSpinner} from 'components/Spinner';
import {PartnerSelection} from 'components/SectionMenu';
import NoDataView from 'components/NoDataView';
import {OrderedProductType} from 'types/Responses/FetchGetOrderDetailsResponse';
import {useDialog} from 'components/Dialog';
import {PartnerDetailsType} from 'types/Responses/FetchGetPartnerDetailsResponse';
import {CalculateImportProductType as StateParams} from 'types/Responses/FetchCalculateImportProductTotalPrice';
import {toStringPrice} from 'services/UtilService';
import {RouteProp} from '@react-navigation/native';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.CreateImportProduct
  >;
}

const CreateImportProduct = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const dialog = useDialog();
  const [data, setData] = useState<StateParams | undefined>(undefined);
  const selectedProviderId = useRef<number | undefined>(undefined);
  const importProductId = useRef<number | undefined>(undefined);

  const onSelectedProducts = useCallback(
    async (products: SelectedProductType[]) => {
      if (products.length === 0) {
        setData(undefined);
      } else {
        const data: Array<ImportedProductType> = products.map(v => {
          return {
            ...v,
            quantity: 1,
            discount: 0,
            discountType: 'cash',
            description: '',
            price: v.costPrice as number,
          };
        });
        await fetchCalculateTotalPrice(data);
      }
    },
    [],
  );

  const onPressItem = useCallback(
    (item: OrderedProductType) => {
      if (selectedProviderId.current) {
        NavigationService.pushToScreen(
          TransactionScreenID.ImportProductSetting,
          {
            productId: item.id,
            productName: item.name,
            productPrice: data?.products.find(v => v.id === item.id)?.price,
            providerId: selectedProviderId.current,
            otherProducts: data?.products.filter(v => v.id !== item.id),
            importProductId: importProductId.current,
            isImportProduct: params.isImportProduct,
          },
          async (value: {
            result: {products: ImportedProductType[]; id: number};
          }) => {
            importProductId.current = value.result.id;
            await fetchCalculateTotalPrice(value.result.products);
          },
        );
      } else {
        dialog.show({
          type: 'Error',
          message: 'Hãy chọn nhà cung cấp để tiếp tục',
        });
      }
    },
    [data],
  );

  const onSubmit = useCallback(async () => {
    if (selectedProviderId.current) {
      try {
        spinner.show();
        const body = {
          provider: selectedProviderId.current,
          id: importProductId.current,
          products: data?.products as ImportedProductType[],
          payments: [],
          newStatus: ImportStatusType.Processing,
        };
        let response;
        if (params.isImportProduct) {
          const {data} = await OrderService.fetchCreateOrUpdateImportProduct(
            body,
          );
          response = data;
        } else {
          const {data} =
            await OrderService.fetchCreateOrUpdateReturnOfImportedGood(body);
          response = data;
        }
        NavigationService.pushToScreen(
          TransactionScreenID.ImportProductCheckout,
          {
            ...response,
            isImportProduct: params.isImportProduct,
          },
        );
      } catch (error) {
        console.log('[ERROR] fetchCreateOrUpdateImportProduct', error);
      } finally {
        spinner.dismiss();
      }
    } else {
      dialog.show({
        type: 'Error',
        message: 'Hãy chọn nhà cung cấp để tiếp tục',
      });
    }
  }, [data]);

  const onProviderSelected = useCallback(
    (data: PartnerDetailsType | undefined) => {
      selectedProviderId.current = data ? data.id : undefined;
    },
    [],
  );

  const fetchCalculateTotalPrice = async (products: ImportedProductType[]) => {
    try {
      spinner.show();
      const {data} = await OrderService.fetchCalculateImportProductTotalPrice(
        products,
      );
      setData(data);
    } catch (error) {
      console.log('[ERROR] fetchCalculateTotalPrice', error);
    } finally {
      spinner.dismiss();
    }
  };

  const renderContent = () => {
    if (!data) {
      return (
        <NoDataView
          style={l.px20}
          title="Chọn sản phẩm và nhà cung cấp để tiếp tục"
        />
      );
    }
    return (
      <>
        <OrderInfo
          onPressItem={onPressItem}
          total={data.receipt.totalAmount}
          products={data.products}>
          <OrderInfoRow
            title="Giảm giá hóa đơn"
            value={toStringPrice(
              data.receipt.totalAmount - data.receipt.paymentRequire,
            )}
          />
          <OrderInfoRow
            title={params.isImportProduct ? 'Cần trả NCC' : 'NCC cần trả'}
            value={toStringPrice(data.receipt.paymentRequire)}
          />
        </OrderInfo>
        <GradientButton
          title="TIẾP TỤC"
          widgetStyles={{container: [l.mt30, l.mb20, l.mx20]}}
          onPress={onSubmit}
        />
      </>
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title={params.isImportProduct ? 'Nhập hàng' : 'Trả hàng NCC'}
        useBack
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={l.flex}>
        <SelectProductsOrScanQRCode onSelected={onSelectedProducts} />
        <View style={[{backgroundColor: c.grey100}, l.py20]}>
          <PartnerSelection type="provider" onSelected={onProviderSelected} />
        </View>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default CreateImportProduct;
