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
              {isProfit && 'L???I NHU???N G???P'}
              {isStatistical && 'GI?? TR??? ????N H??NG'}
              {isInventory && 'GI?? TR??? T???N KHO'}
              {isExportImport && 'T???N KHO CU???I K???'}
            </Text>
            <Text style={[t.bold, {color: c.blue500}]}>
              {isRevenue && toStringPrice(9000000)}
              {isProfit && toStringPrice(4000000)}
              {isStatistical && toStringPrice(19000000)}
              {isInventory && toStringPrice(12000000)}
              {isExportImport && toStringPrice(12000000)}
            </Text>
            <Text style={[t.light, {color: c.black200}]}>
              {isRevenue && 'S??? ????n h??ng: 4'}
              {isProfit && 'T??? su???t l???i nhu???n: 45%'}
              {isStatistical && 'S??? ????n h??ng: 10'}
              {isInventory && 'S??? l?????ng: 10'}
              {isExportImport && 'S??? l?????ng: 45'}
            </Text>
          </View>
        </View>

        {isExportImport ? (
          <View style={[l.mt10]}>
            <View style={[l.justifyBtw, l.flexRow]}>
              <Text style={[{color: c.black100}, t.bold]}>T???n kho ?????u k???</Text>
              <Text style={[t.bold]}>{toStringPrice(5000000)}</Text>
            </View>
            <View style={[l.justifyBtw, l.flexRow]}>
              <Text style={[{color: c.black100}, t.bold]}>Nh???p trong k???</Text>
              <Text style={[t.bold]}>{toStringPrice(15000000)}</Text>
            </View>
            <View style={[l.justifyBtw, l.flexRow]}>
              <Text style={[{color: c.black100}, t.bold]}>Xu???t trong k???</Text>
              <Text style={[t.bold]}>{toStringPrice(8000000)}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.text}>
            {isRevenue && 'Doanh thu = Doanh thu thu???n + Ph?? giao h??ng + Thu???'}
            {isProfit && 'L???i nhu???n g???p = Doanh thu - Ph?? - Thu??? - Gi?? v???n'}
            {isStatistical &&
              'Gi?? tr??? ????n h??ng bao g???m c??c ????n h??ng ch??a ho??n th??nh'}
            {isInventory &&
              `Gi?? v???n(MAC) = (Gi?? tr??? t???n kho + Gi?? tr??? nh???p kho)\n(S??? l?????ng t???n kho + S??? l?????ng nh???p kho)\nH??ng h??a l?? d???ch v??? kh??ng c?? gi?? tr??? t???n kho`}
          </Text>
        )}
      </View>
    );
  },
);
