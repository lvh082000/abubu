import {CommonActions, DrawerActions} from '@react-navigation/native';
import {NavigationState, StackActions} from '@react-navigation/routers';

type Params = {[key: string]: any} | undefined;
//@ts-ignore
function getCurrentRouteData(state: any) {
  if (!state) {
    return null;
  }
  const route = state.routes[state.index];
  if (route && route.state) {
    return getCurrentRouteData(route.state);
  }
  if (route.routes) {
    return getCurrentRouteData(route);
  }
  return {
    name: route.name,
    params: route.params,
  };
}

export default class NavigationService {
  static navigator: any = {};
  static currentRouterName: string;
  static currentRouteParams: Params = {};
  static prevRouterName: string;
  static prevRouteParams: Params = {};

  static pushToScreen = (
    name: string,
    params?: Params,
    resultCallback?: (data: {result: any}) => void,
  ) => {
    NavigationService.navigator &&
      NavigationService.navigator.dispatch(
        CommonActions.navigate({
          name,
          params: params ? {...params, resultCallback} : {resultCallback},
        }),
      );
  };

  static forcePushScreen = (
    name: string,
    params?: Params,
    resultCallback?: (data: {result: any}) => void,
  ) => {
    const pushAction = StackActions.push(
      name,
      params ? {...params, resultCallback} : {resultCallback},
    );
    NavigationService.navigator &&
      NavigationService.navigator.dispatch(pushAction);
  };

  static resetToScreen = (name: string, params?: Params) => {
    NavigationService.navigator &&
      NavigationService.navigator.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name, params}],
        }),
      );
  };

  static replace = (name: string, params?: Params) => {
    NavigationService.navigator &&
      NavigationService.navigator.dispatch(StackActions.replace(name, params));
  };

  static goBack = (n = 1, resultData: undefined | Params = undefined) => {
    if (
      resultData &&
      NavigationService.currentRouteParams &&
      NavigationService.currentRouteParams.resultCallback
    ) {
      NavigationService.currentRouteParams.resultCallback(resultData);
    }
    NavigationService.navigator &&
      NavigationService.navigator.dispatch(StackActions.pop(n));
  };
  static backToTop = () => {
    NavigationService.navigator &&
      NavigationService.navigator.dispatch(StackActions.popToTop());
  };

  static onStateChange = (state: NavigationState | undefined) => {
    const routeData = getCurrentRouteData(state);

    NavigationService.prevRouteParams = NavigationService.currentRouteParams;
    NavigationService.prevRouterName = NavigationService.currentRouterName;
    NavigationService.currentRouterName = routeData?.name;
    NavigationService.currentRouteParams = routeData.params;
  };

  static openDrawer = () => {
    NavigationService.navigator &&
      NavigationService.navigator.dispatch(DrawerActions.openDrawer());
  };

  static closeDrawer = () => {
    NavigationService.navigator &&
      NavigationService.navigator.dispatch(DrawerActions.closeDrawer());
  };
}
