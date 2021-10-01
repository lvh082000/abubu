import {Radio, RadioOption} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import React, {useCallback, useRef} from 'react';
import {View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';

interface Props {
  options: Array<RadioOption>;
  initialValue?: number | string | undefined;
  rightComponent?: (index: number) => JSX.Element;
  onDone?: (value: RadioOption) => void;
  onChangeValue?: (value: RadioOption) => void;
}

const ListSelectedOptions = ({
  initialValue,
  options,
  onDone,
  rightComponent,
  onChangeValue,
}: Props) => {
  const selectedValue = useRef<RadioOption | undefined>(undefined);

  const _onDone = () => {
    if (selectedValue.current && onDone) {
      onDone(selectedValue.current);
    }
  };

  const _onChangeValue = useCallback(
    (index: number | string) => {
      selectedValue.current = options.find(v => v.value === index);
      if (selectedValue.current && onChangeValue) {
        onChangeValue(selectedValue.current);
      }
    },
    [onChangeValue],
  );

  return (
    <View style={ContainerStyles}>
      <Radio
        value={initialValue}
        onChangeValue={_onChangeValue}
        widgetStyles={{
          container: [l.mx20, l.mt30],
          option: [l.justifyBtw],
        }}
        type="square"
        options={options}
        rightComponent={rightComponent}
      />
      {onDone && (
        <View style={[{height: 55}, l.mx20]}>
          <GradientButton
            widgetStyles={{container: l.mt10}}
            title="XONG"
            onPress={_onDone}
          />
        </View>
      )}
    </View>
  );
};

export default React.memo(ListSelectedOptions);
