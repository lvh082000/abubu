import * as React from 'react';
import {
  Animated,
  BackHandler,
  Easing,
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';

interface State {
  isVisible: boolean;
  isAnimating: boolean;
  overlayOpacity: any;
  sheetOpacity: any;
  component: JSX.Element | null;
}

interface Props {
  readonly useNativeDriver: boolean;
  readonly pointerEvents?: ViewProps['pointerEvents'];
}

const OPACITY_ANIMATION_IN_TIME = 225;
const OPACITY_ANIMATION_OUT_TIME = 195;
const EASING_OUT = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const EASING_IN = Easing.out(EASING_OUT);

// Has same API as https://facebook.github.io/react-native/docs/actionsheetios.html
export default class BottomSheet extends React.Component<Props, State> {
  static defaultProps = {
    useNativeDriver: true,
  };

  _bottomSheetHeight = 360;
  _bottomSheetLayout: LayoutRectangle | undefined = undefined;

  state: State = {
    isVisible: false,
    isAnimating: false,
    overlayOpacity: new Animated.Value(0),
    sheetOpacity: new Animated.Value(0),
    component: null,
  };

  _onPress = ({nativeEvent}: GestureResponderEvent) => {
    const {pageY} = nativeEvent;

    if (this._bottomSheetLayout && pageY < this._bottomSheetLayout.y) {
      this._animateOut();
    }
  };

  _deferNextShow?: () => void = undefined;

  _setActionSheetHeight = ({nativeEvent}: LayoutChangeEvent) => {
    this._bottomSheetHeight = nativeEvent.layout.height;
    this._bottomSheetLayout = nativeEvent.layout;
  };

  render() {
    const {isVisible, overlayOpacity} = this.state;
    const overlay = isVisible ? (
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
          },
        ]}
      />
    ) : null;

    // While the sheet is visible, hide the rest of the app's content from screen readers.
    const appContent = (
      <View
        style={styles.flexContainer}
        importantForAccessibility={isVisible ? 'no-hide-descendants' : 'auto'}>
        {React.Children.only(this.props.children)}
      </View>
    );

    return (
      <View
        pointerEvents={this.props.pointerEvents}
        style={styles.flexContainer}>
        {appContent}
        {isVisible && (
          <React.Fragment>
            {overlay}
            {this._renderSheet()}
          </React.Fragment>
        )}
      </View>
    );
  }

  _renderSheet() {
    const {isAnimating, sheetOpacity, component} = this.state;
    if (!component) {
      return null;
    }

    return (
      <TouchableWithoutFeedback
        importantForAccessibility="yes"
        onPress={this._onPress}>
        <Animated.View
          needsOffscreenAlphaCompositing={isAnimating}
          style={[
            styles.sheetContainer,
            {
              opacity: sheetOpacity,
              transform: [
                {
                  translateY: sheetOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this._bottomSheetHeight, 0],
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.sheet} onLayout={this._setActionSheetHeight}>
            <View style={styles.wrapper}>{component}</View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  showBottomSheet = (component: JSX.Element) => {
    const {isVisible, overlayOpacity, sheetOpacity} = this.state;

    if (isVisible) {
      this._deferNextShow = this.showBottomSheet.bind(this, component);
      return;
    }

    // @ts-ignore
    this.setState({
      isVisible: true,
      isAnimating: true,
      component,
    });
    overlayOpacity.setValue(0);
    sheetOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0.32,
        easing: EASING_OUT,
        duration: OPACITY_ANIMATION_IN_TIME,
        useNativeDriver: this.props.useNativeDriver,
      }),
      Animated.timing(sheetOpacity, {
        toValue: 1,
        easing: EASING_OUT,
        duration: OPACITY_ANIMATION_IN_TIME,
        useNativeDriver: this.props.useNativeDriver,
      }),
    ]).start(result => {
      if (result.finished) {
        this.setState({
          isAnimating: false,
        });
        this._deferNextShow = undefined;
      }
    });

    BackHandler.addEventListener(
      // @ts-ignore: Argument of type '"actionSheetHardwareBackPress"' is not assignable to parameter of type '"hardwareBackPress"'
      'actionSheetHardwareBackPress',
      this._animateOut,
    );
  };

  dismissBottomSheet = () => {
    if (!this.state.isVisible) {
      return;
    }
    this._animateOut();
  };

  _animateOut = (): boolean => {
    const {isAnimating, overlayOpacity, sheetOpacity} = this.state;

    if (isAnimating) {
      return false;
    }

    BackHandler.removeEventListener(
      // @ts-ignore: Argument of type '"actionSheetHardwareBackPress"' is not assignable to parameter of type '"hardwareBackPress"'
      'actionSheetHardwareBackPress',
      this._animateOut,
    );
    this.setState({
      isAnimating: true,
    });
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        easing: EASING_IN,
        duration: OPACITY_ANIMATION_OUT_TIME,
        useNativeDriver: this.props.useNativeDriver,
      }),
      Animated.timing(sheetOpacity, {
        toValue: 0,
        easing: EASING_IN,
        duration: OPACITY_ANIMATION_OUT_TIME,
        useNativeDriver: this.props.useNativeDriver,
      }),
    ]).start(result => {
      if (result.finished) {
        this.setState({
          isVisible: false,
          isAnimating: false,
        });

        if (this._deferNextShow) {
          this._deferNextShow();
        }
      }
    });
    return true;
  };
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sheet: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  wrapper: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
});
