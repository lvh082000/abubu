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
import Text from 'components/Text';

interface Props {
  data?: Array<any>;
  description?: string;
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

export const MyBarChart = React.memo(({description}: Props) => {
  return (
    <View style={[l.mx20, l.mt10]}>
      <VictoryChart
        domainPadding={20}
        height={400}
        width={DeviceHelper.width - 40}
        padding={{top: 0, bottom: 60, left: 0, right: 0}}>
        <VictoryGroup colorScale={[c.blue400, c.blue900]}>
          <VictoryBar
            labels={({datum}) => formatLabel(datum)}
            data={Turnover}
            barWidth={20}
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
      {!!description && (
        <Text style={[t.pSM, {color: c.brown100}]}>{description}</Text>
      )}
    </View>
  );
});
