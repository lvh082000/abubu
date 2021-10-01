import Text from 'components/Text';
import {useAppState} from 'hooks/useAppState';
import React, {useCallback, useEffect, useState} from 'react';
import {AppStateStatus, View, TouchableOpacity} from 'react-native';
import {l, c, t} from 'styles/shared';

const DefaultTimer = 60;

export const Timers = ({onResend}: {onResend: () => void}) => {
  const appState = useAppState();
  const [time, setTime] = useState(DefaultTimer);
  const [countDownTime, startCountDownTime] = useState(Date.now());
  let timerInterval: NodeJS.Timer | null;

  const startTimer = () => {
    timerInterval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);
  };

  const clearTimer = () => {
    timerInterval && clearInterval(timerInterval);
    timerInterval = null;
  };

  const _onResend = useCallback(() => {
    setTime(DefaultTimer);
    startCountDownTime(Date.now());
    onResend();
  }, [onResend]);

  const handleAppStateChange = (next: AppStateStatus) => {
    // App has come to the foreground
    if (next === 'active') {
      const diffTime = Date.now() - countDownTime;

      if (diffTime <= DefaultTimer * 1000) {
        const value = DefaultTimer - Math.floor(diffTime / 1000);
        setTime(value);
      } else {
        // Time over, then update the UI
        setTime(0);
      }
    } else if (next === 'background') {
      // App has come to background, need to clear timer
      clearTimer();
    }
  };

  useEffect(() => {
    if (time === 0) {
      clearTimer();
    } else {
      startTimer();
    }

    return () => {
      clearTimer();
    };
  }, [time]);

  useEffect(() => {
    handleAppStateChange(appState);
  }, [appState, countDownTime]);

  return (
    <View style={[l.mx20, l.flexRow, l.alignCtr, l.justifyBtw, l.mt10]}>
      <Text style={[t.h5, {color: c.white}]}>
        {time === 0 ? 'Đã hết hạn' : 'Hết hạn trong'}:{' '}
      </Text>
      <TouchableOpacity
        onPress={_onResend}
        activeOpacity={0.7}
        disabled={time !== 0}>
        <Text style={[t.h5, {color: c.white}]}>
          {time === 0 ? 'Gửi lại' : `${time} giây`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
