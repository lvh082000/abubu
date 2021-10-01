import BackButton from 'components/BackButton';
import {useDialog} from 'components/Dialog';
import {QuestionIcon} from 'components/SharedIcons';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NavigationService from 'services/NavigationService';
import {l, c, t} from 'styles/shared';

interface Props {
  useDrawer?: boolean;
  useBack?: boolean;
  title: string;
  rightComponent?: JSX.Element;
  description?: string;
  goBack?: () => void;
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    ...l.mx20,
    ...l.alignCtr,
    ...l.flexRow,
    ...l.justifyBtw,
  },
  title: {
    color: c.white,
    fontFamily: t.fontFamily.Winston.Bold,
    ...t.h4,
    ...l.ml15,
  },
});

export const GradientHeader = React.memo(
  ({title, useBack, useDrawer, rightComponent, description, goBack}: Props) => {
    const {top} = useSafeAreaInsets();
    const dialog = useDialog();
    const openDrawer = () => {
      NavigationService.openDrawer();
    };

    const onQuestion = useCallback(() => {
      dialog.show({
        type: 'Info',
        title: 'Thông tin',
        message: description,
      });
    }, [description]);

    const renderLeft = () => {
      if (useDrawer) {
        return (
          <TouchableOpacity onPress={openDrawer} activeOpacity={0.7}>
            <VectorIcon
              color={c.white}
              size={30}
              type={IconType.material}
              name={'sort'}
            />
          </TouchableOpacity>
        );
      }
      if (useBack) {
        return <BackButton goBack={goBack} />;
      }
    };

    const renderRight = () => {
      if (rightComponent) {
        if (description) {
          return (
            <View style={[l.flexRow]}>
              <QuestionIcon onPress={onQuestion} />
              {rightComponent}
            </View>
          );
        }
        return rightComponent;
      }
      return <QuestionIcon onPress={onQuestion} />;
    };
    return (
      <LinearGradient
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        colors={['#11655D', '#09332F']}>
        <View style={[styles.container, {marginTop: top}]}>
          <View style={l.flexRow}>
            {renderLeft()}
            <Text style={styles.title}>{title}</Text>
          </View>
          {renderRight()}
        </View>
      </LinearGradient>
    );
  },
);
