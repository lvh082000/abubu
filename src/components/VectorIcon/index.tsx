import React, {FC} from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
//@ts-ignore
import iconConfig from './selection.json';
export enum IconType {
  material = 'material',
  materialCommunity = 'material-community',
  ionIcon = 'ionicon',
  foundation = 'foundation',
  evilIcon = 'evilicon',
  zocial = 'zocial',
  entypo = 'entypo',
  feather = 'feather',
  antDesign = 'antdesign',
  fontAwesome = 'fontAwesome',
  octicons = 'Octicons',
  custom = 'custom',
}

export interface VectorIconProps extends IconProps {
  type: IconType;
}

const VectorIcon: FC<VectorIconProps> = ({
  type = IconType.material,
  size = 18,
  ...rest
}) => {
  switch (type) {
    case IconType.material:
      const MaterialIcons =
        require('react-native-vector-icons/MaterialIcons').default;
      return <MaterialIcons {...rest} size={size} />;

    case IconType.materialCommunity:
      const MaterialCommunityIcons =
        require('react-native-vector-icons/MaterialCommunityIcons').default;
      return <MaterialCommunityIcons {...rest} size={size} />;

    case IconType.ionIcon:
      const Ionicons = require('react-native-vector-icons/Ionicons').default;
      return <Ionicons {...rest} size={size} />;

    case IconType.foundation:
      const Foundation =
        require('react-native-vector-icons/Foundation').default;
      return <Foundation {...rest} size={size} />;

    case IconType.evilIcon:
      const EvilIcons = require('react-native-vector-icons/EvilIcons').default;
      return <EvilIcons {...rest} size={size} />;

    case IconType.zocial:
      const Zocial = require('react-native-vector-icons/Zocial').default;
      return <Zocial {...rest} size={size} />;

    case IconType.entypo:
      const Entypo = require('react-native-vector-icons/Entypo').default;
      return <Entypo {...rest} size={size} />;

    case IconType.feather:
      const Feather = require('react-native-vector-icons/Feather').default;
      return <Feather {...rest} size={size} />;

    case IconType.antDesign:
      const AntDesign = require('react-native-vector-icons/AntDesign').default;
      return <AntDesign {...rest} size={size} />;

    case IconType.fontAwesome:
      const FontAwesome =
        require('react-native-vector-icons/FontAwesome').default;
      return <FontAwesome {...rest} size={size} />;

    case IconType.octicons:
      const Octicons = require('react-native-vector-icons/Octicons').default;
      return <Octicons {...rest} size={size} />;

    case IconType.custom:
      const IconCustom = createIconSetFromIcoMoon(iconConfig);
      return <IconCustom {...rest} size={size} />;

    default:
      return null;
  }
};

export default VectorIcon;
