import Text from 'components/Text';
import React, {Suspense} from 'react';
import {lazily} from 'react-lazily';
import {Image, StyleSheet, View} from 'react-native';
import {c, l, t} from 'styles/shared';

interface Props {
  image: number;
  title?: string;
  total?: string;
}

const styles = StyleSheet.create({
  sectionOverview: {
    ...l.fullWidth,
    ...l.px25,
    ...l.mt30,
  },
  boxOverview: {
    ...l.alignCtr,
    ...l.flexRow,
  },
  textOverview: {
    ...t.semi,
    ...t.h5LG,
    ...l.pl10,
  },
  textDescription: {
    ...l.mt10,
    ...l.mb10,
    ...t.semi,
    ...t.h5,
    color: '#636363',
  },
  tableOverview: {
    ...l.flexRow,
    borderColor: c.green800,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  view: {
    height: '100%',
    width: 1,
    backgroundColor: c.green800,
  },
  billContainer: {
    ...l.flex,
    ...l.flexRow,
    ...l.pt10,
    ...l.pb15,
  },
  boxImage: {
    ...l.px5,
    ...l.flexCenter,
    ...l.ml5,
  },
  billInfo: {
    ...l.pl10,
  },
  firstRow: {
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  secondRow: {
    borderTopWidth: 0.5,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

const {MyBarsChart} = lazily(() => import('components/Charts/MyBarsChart'));

const Bill = ({image, title, total}: Props) => {
  return (
    <View style={styles.billContainer}>
      <View style={styles.boxImage}>
        <Image resizeMode={'contain'} source={image} />
      </View>
      <View style={styles.billInfo}>
        <Text style={[t.semi, t.h5]}>{title}</Text>
        <Text style={[t.semi, t.h5, {color: c.green800}]}>{total}</Text>
      </View>
    </View>
  );
};

const Overview = () => {
  return (
    <>
      <View style={styles.sectionOverview}>
        <View style={styles.boxOverview}>
          <Image
            resizeMode={'contain'}
            source={require('../../../assets/images/eye.png')}
          />
          <Text style={styles.textOverview}>Tổng quan</Text>
        </View>

        <Text style={styles.textDescription}>
          KẾT QUẢ BÁN HÀNG, CHI PHÍ HÔM NAY
        </Text>

        <View style={[styles.tableOverview, styles.firstRow]}>
          <Bill
            image={require('../../../assets/images/turnover.png')}
            title="Doanh thu"
            total="5,000,000"
          />
          <View style={styles.view}></View>
          <Bill
            image={require('../../../assets/images/cart.png')}
            title="Đơn hàng mới"
            total="20"
          />
        </View>

        <View style={[styles.tableOverview, styles.secondRow]}>
          <Bill
            image={require('../../../assets/images/reply.png')}
            title="Đơn trả hàng"
            total="5"
          />
          <View style={styles.view}></View>
          <Bill
            image={require('../../../assets/images/close.png')}
            title="Đơn hủy"
            total="1"
          />
        </View>
      </View>
      <Text style={[styles.textDescription, l.mx20, l.mt30]}>
        DOANH THU BÁN HÀNG 7 NGÀY QUA
      </Text>
      <Suspense fallback={null}>
        <MyBarsChart />
      </Suspense>
    </>
  );
};

export default React.memo(Overview);
