import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';

interface Props {
  isRevenue?: boolean;
  isProfit?: boolean;
  isStatistical?: boolean;
  isInventory?: boolean;
  isExportImport?: boolean;
}

const styles = StyleSheet.create({
  container: {
    ...l.mx20,
    ...l.py10,
    ...l.px10,
    borderWidth: 1,
    borderColor: c.green800,
    borderRadius: 5,
  },
  iconContainer: {
    ...l.flexCenter,
    ...l.mr10,
    width: 40,
    height: 40,
    backgroundColor: c.green800,
    borderRadius: 20,
  },
  text: {
    ...t.light,
    ...t.pSM,
    ...t.textCtr,
    ...l.mt10,
    color: c.black200,
  },
});

export const HeaderReport = React.memo(
  ({
    isRevenue,
    isProfit,
    isStatistical,
    isInventory,
    isExportImport,
  }: Props) => {
    return (
      <View style={styles.container}>
        <View style={[l.flexRow, l.flexCenter]}>
          <View style={styles.iconContainer}>
            {isRevenue && (
              <VectorIcon
                size={24}
                color={c.white}
                name={'bar-chart'}
                type={IconType.ionIcon}
              />
            )}
            {isProfit && (
              <VectorIcon
                size={24}
                color={c.white}
                name={'calculate'}
                type={IconType.material}
              />
            )}
            {isStatistical && (
              <VectorIcon
                size={24}
                color={c.white}
                name={'list'}
                type={IconType.ionIcon}
              />
            )}
            {isInventory && (
              <VectorIcon
                size={24}
                color={c.white}
                name={'inventory'}
                type={IconType.material}
              />
            )}
            {isExportImport && (
              <VectorIcon
                size={24}
                color={c.white}
                name={'list'}
                type={IconType.ionIcon}
              />
            )}
          </View>

          <View style={[l.ml15]}>
            <Text style={[t.bold, t.h5LG]}>
              {isRevenue && 'DOANH THU'}
              {isProfit && 'LỢI NHUẬN GỘP'}
              {isStatistical && 'GIÁ TRỊ ĐƠN HÀNG'}
              {isInventory && 'GIÁ TRỊ TỒN KHO'}
              {isExportImport && 'TỒN KHO CUỐI KỲ'}
            </Text>
            <Text style={[t.bold, {color: c.blue500}]}>
              {isRevenue && toStringPrice(9000000)}
              {isProfit && toStringPrice(4000000)}
              {isStatistical && toStringPrice(19000000)}
              {isInventory && toStringPrice(12000000)}
              {isExportImport && toStringPrice(12000000)}
            </Text>
            <Text style={[t.light, {color: c.black200}]}>
              {isRevenue && 'Số đơn hàng: 4'}
              {isProfit && 'Tỷ suất lợi nhuận: 45%'}
              {isStatistical && 'Số đơn hàng: 10'}
              {isInventory && 'Số lượng: 10'}
              {isExportImport && 'Số lượng: 45'}
            </Text>
          </View>
        </View>

        {isExportImport ? (
          <View style={[l.mt10]}>
            <View style={[l.justifyBtw, l.flexRow]}>
              <Text style={[{color: c.black100}, t.bold]}>Tồn kho đầu kỳ</Text>
              <Text style={[t.bold]}>{toStringPrice(5000000)}</Text>
            </View>
            <View style={[l.justifyBtw, l.flexRow]}>
              <Text style={[{color: c.black100}, t.bold]}>Nhập trong kỳ</Text>
              <Text style={[t.bold]}>{toStringPrice(15000000)}</Text>
            </View>
            <View style={[l.justifyBtw, l.flexRow]}>
              <Text style={[{color: c.black100}, t.bold]}>Xuất trong kỳ</Text>
              <Text style={[t.bold]}>{toStringPrice(8000000)}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.text}>
            {isRevenue && 'Doanh thu = Doanh thu thuần + Phí giao hàng + Thuế'}
            {isProfit && 'Lợi nhuận gộp = Doanh thu - Phí - Thuế - Giá vốn'}
            {isStatistical &&
              'Giá trị đơn hàng bao gồm các đơn hàng chưa hoàn thành'}
            {isInventory &&
              `Giá vốn(MAC) = (Giá trị tồn kho + Giá trị nhập kho)\n(Số lượng tồn kho + Số lượng nhập kho)\nHàng hóa là dịch vụ không có giá trị tồn kho`}
          </Text>
        )}
      </View>
    );
  },
);
