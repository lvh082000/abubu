import Button from 'components/Button';
import {ToggleSwitch} from 'components/FormControls';
import {GradientHeader} from 'components/Header';
import {QuestionIcon} from 'components/SharedIcons';
import React, {useCallback, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {l, c} from 'styles/shared';
import GradientView from './components/GradientView';
import styles from './styles';
import NavigationService from 'services/NavigationService';
import {SettingScreenID} from 'navigation/SettingNavigation';

const ManagementSetting = () => {
  const [enableDebt, setEnableDelt] = useState<boolean>(true);

  const values = useRef({
    enableAverageCostOfCapital: true,
    enableCostOfCapitalInputFirst: true,
  });

  const onValueChange = (field: string, value: boolean) => {
    const data = {};
    //@ts-ignore
    data[field] = value;
    values.current = {
      ...values.current,
      ...data,
    };
  };

  const navigationDebtSetting = useCallback((link: string) => {
    NavigationService.pushToScreen(SettingScreenID.DebtSetting, {
      screen: link,
    });
  }, []);

  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Thiết lập quản lý"
      />

      <GradientView
        title="Phương thức xác định giá vốn hàng hóa"
        widgetStyles={{container: l.mt20}}
      />
      <View style={styles.sectionManagement}>
        <View style={styles.item}>
          <Text style={styles.title}>Giá vốn bình quân</Text>
          <ToggleSwitch
            handleOnPress={value =>
              onValueChange('enableAverageCostOfCapital', value)
            }
            value={values.current.enableAverageCostOfCapital}
          />
        </View>
        <Text style={styles.textDescription}>
          Giá vốn của một mặt hàng (cùng mã sản phẩm) tạo một thời điểm bằng
          (giá vốn bình quân trước đó x số lượng hàng tồn kho + giá vốn hàng mới
          nhập * số lượng hàng mới nhập)/(số lượng hàng tồn kho + số lượng hàng
          mới nhập)
        </Text>

        <View style={[styles.item, l.pt30]}>
          <Text style={styles.title}>Giá vốn nhập trước xuất trước</Text>
          <ToggleSwitch
            handleOnPress={value =>
              onValueChange('enableCostOfCapitalInputFirst', value)
            }
            value={values.current.enableCostOfCapitalInputFirst}
          />
        </View>
        <Text style={styles.textDescription}>
          Giá vốn của một mặt hàng được lưu theo từng đơn nhập, đơn nào nhập
          trước thì bán trước
        </Text>
      </View>

      <GradientView
        title="Quản lý công nợ khách hàng"
        widgetStyles={{container: l.mt10}}
      />
      <View style={[l.px30, l.pt10]}>
        <View style={[l.flexRow, l.justifyBtw]}>
          <View style={[l.flexRow, {width: '70%'}]}>
            <Text style={[styles.textDescription]}>
              Cho phép thiết lập hạn mức công nợ để cảnh báo khách hàng
            </Text>
            <QuestionIcon color={c.green800} size={20} />
          </View>

          <ToggleSwitch
            handleOnPress={value => setEnableDelt(!value)}
            value={enableDebt}
          />
        </View>
        {enableDebt ? (
          <View
            style={{
              ...l.pt10,
              width: '30%',
              alignSelf: 'flex-end',
            }}>
            <Button
              title="Cài đặt"
              variant="primaryOutline"
              onPress={() => navigationDebtSetting('SettingScreen_DebtSetting')}
              size="sm"
            />
          </View>
        ) : null}
      </View>

      <GradientView title="Cài đặt máy in" widgetStyles={{container: l.mt20}} />
      <Text style={[styles.textDescription, l.px30, l.pt10]}>
        Tính năng sử dụng phiên bản web và đang hoàn thiện với phiên bản App
        mobile
      </Text>

      <View style={styles.viewButton}>
        <Button title="Lưu" variant="primary" onPress={() => {}} />
      </View>
    </View>
  );
};

export default ManagementSetting;
