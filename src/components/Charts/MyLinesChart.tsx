import DeviceHelper from 'config/DeviceHelper';
import React from 'react';
import {View} from 'react-native';
import {
  VictoryGroup,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
} from 'victory-native';
import {l, c, t} from 'styles/shared';
import {generateArray, randomNumber} from 'services/UtilService';
import Dayjs from 'dayjs';
import Text from 'components/Text';

const Revenue = generateArray(7).map(i => {
  return {
    x: i + 1,
    y: randomNumber(22, 25) / 10,
  };
});

const Cost = generateArray(7).map(i => {
  return {
    x: i + 1,

    y: randomNumber(15, 17) / 10,
  };
});

const Result = generateArray(7).map(i => {
  return {
    x: i + 1,
    y: parseFloat((Revenue[i].y - Cost[i].y).toFixed(1)),
  };
});

const formatLabel = (datum: {x: number; y: number}) => {
  return datum.y;
};

const formatDate = (value: number) => {
  const date = Dayjs().subtract(8 - value, 'day');
  return Dayjs(date).format('DD/MM');
};

export const MyLinesChart = React.memo(() => {
  return (
    <View style={[l.mx20, l.mt10]}>
      <VictoryChart
        domainPadding={20}
        height={400}
        width={DeviceHelper.width - 40}
        padding={{top: 50, bottom: 60, left: 0, right: 0}}>
        <VictoryLegend
          y={1}
          x={DeviceHelper.width / 2 - 190}
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{
            border: {
              stroke: c.green800,
            },
          }}
          data={[
            {name: 'Doanh thu', symbol: {fill: c.red800, type: 'square'}},
            {name: 'Gía vốn, thuế', symbol: {fill: c.blue600, type: 'square'}},
            {
              name: 'Lợi nhuận gộp',
              symbol: {fill: c.orange400, type: 'square'},
            },
          ]}
        />

        <VictoryGroup domain={{y: [0, 3]}}>
          <VictoryLine
            interpolation="natural"
            style={{
              data: {
                stroke: c.red800,
                strokeWidth: 4,
              },
            }}
            labels={({datum}) => formatLabel(datum)}
            data={Revenue}
            labelComponent={
              <VictoryLabel
                style={{fontSize: 10, fontFamily: t.fontFamily.Winston.Medium}}
                dy={-5}
              />
            }
          />
          <VictoryLine
            interpolation="natural"
            style={{
              data: {
                stroke: c.blue600,
                strokeWidth: 4,
              },
            }}
            labels={({datum}) => formatLabel(datum)}
            data={Cost}
            labelComponent={
              <VictoryLabel
                style={{fontSize: 10, fontFamily: t.fontFamily.Winston.Medium}}
                dy={-5}
              />
            }
          />
          <VictoryLine
            interpolation="natural"
            style={{
              data: {
                stroke: c.orange400,
                strokeWidth: 4,
              },
            }}
            labels={({datum}) => formatLabel(datum)}
            data={Result}
            labelComponent={
              <VictoryLabel
                style={{fontSize: 10, fontFamily: t.fontFamily.Winston.Medium}}
                dy={-5}
              />
            }
          />
        </VictoryGroup>

        <VictoryAxis
          axisLabelComponent={
            <VictoryLabel
              style={[{fontFamily: t.fontFamily.Winston.Medium}]}
              dy={10}
            />
          }
          label="Đơn vị: Triệu đồng"
          tickValues={[1, 2, 3, 4, 5, 6, 7]}
          tickFormat={t => formatDate(t)}
        />
        <VictoryAxis dependentAxis={true} />
      </VictoryChart>
      <Text style={[t.pSM, {color: c.brown100}]}>
        {`- Lợi nhuận gộp (màu vàng) = Doanh thu (màu đỏ) – Thuế,  Giá vốn (màu xanh lam) 
- Giá vốn giá vốn trung bình tại thời điểm xuất kho là`}
      </Text>
    </View>
  );
});
