import GradientButton from 'components/GradientButton';
import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {l, t} from 'styles/shared';

const Upgrade = () => {
  return (
    <View
      style={[
        l.mx20,
        l.mt30,
        l.mb20,
        l.p10,
        {borderWidth: 1, borderRadius: 10},
      ]}>
      <Text style={[t.pSM, t.medium]}>
        {`Bạn đang sử dụng gói Miễn phí, 1 số tính năng bị giới hạn:
- Không xử lý được giao dịch trên nền tảng Web chuyên nghiệp phục vụ kinh doanh hiệu quả
- Chỉ tạo dưới 10 đơn/ ngày
- Không thêm mới sản phẩm nếu đã có trên 30 sản phẩm
- Không tạo được nhiều nhân viên và cập nhập tính năng mới
`}
      </Text>
      <GradientButton
        widgetStyles={{container: l.mb10}}
        title="Nâng cấp lên bản chuyên nghiệp"
      />
    </View>
  );
};

export default Upgrade;
