import DeviceHelper from 'config/DeviceHelper';
import React from 'react';
import {View} from 'react-native';
import {
  VictoryBar,
  VictoryGroup,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend,
} from 'victory-native';
import {l, c, t} from 'styles/shared';
import {generateArray, randomNumber} from 'services/UtilService';
import Dayjs from 'dayjs';

interface Props {
  data?: Array<any>;
}

const Turnover = generateArray(7).map(i => {
  return {
    x: i + 1,
    y: randomNumber(5, 20) / 10,
  };
});

const Expense = generateArray(7).map(i => {
  return {
    x: i + 1,
    y: randomNumber(5, 20) / 10,
  };
});

const formatLabel = (datum: {x: number; y: number}) => {
  return datum.y;
};

const formatDate = (value: number) => {
  const date = Dayjs().subtract(8 - value, 'day');
  return Dayjs(date).format('DD/MM');
};

export const MyBarsChart = React.memo(() => {
  return (
    <View style={[l.mx20, l.mt10]}>
      <VictoryChart
        height={400}
        width={DeviceHelper.width - 40}
        padding={{top: 60, bottom: 60, left: 0, right: 0}}>
        <VictoryLegend
          y={1}
          x={DeviceHelper.width / 2 - 110}
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{border: {stroke: c.green800}}}
          data={[
            {name: 'Doanh thu', symbol: {fill: '#2A9B90', type: 'square'}},
            {name: 'Chi phí', symbol: {fill: c.green800, type: 'square'}},
          ]}
        />
        <VictoryGroup offset={20} colorScale={['#2A9B90', c.green800]}>
          <VictoryBar
            labels={({datum}) => formatLabel(datum)}
            data={Turnover}
            barWidth={20}
            labelComponent={
              <VictoryLabel style={[{fontSize: 10}, t.medium]} dy={-5} />
            }
          />
          <VictoryBar
            labels={({datum}) => formatLabel(datum)}
            data={Expense}
            barWidth={20}
            labelComponent={
              <VictoryLabel style={[{fontSize: 10}, t.medium]} dy={-5} />
            }
          />
        </VictoryGroup>

        <VictoryAxis
          axisLabelComponent={<VictoryLabel style={[t.medium]} dy={10} />}
          label="Đơn vị: Triệu đồng"
          tickValues={[1, 2, 3, 4, 5, 6, 7]}
          tickFormat={t => formatDate(t)}
        />
        <VictoryAxis dependentAxis={true} />
      </VictoryChart>
    </View>
  );
});
