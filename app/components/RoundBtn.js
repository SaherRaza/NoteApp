import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const RoundBtn = ({ antIconName, size, color, style, onPress }) => {
  return (
    <View style={[styles.icon, style]}>
    <TouchableWithoutFeedback onPress={onPress}>
      <AntDesign
        name={antIconName}
        size={size || 24}
        color={color || colors.LIGHT}
      />
    </TouchableWithoutFeedback>
  </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 60, // Set the width and height to create a round shape
    height: 60,
    backgroundColor: colors.PRIMARY,
    borderRadius: 30, // Half of the width and height to make it round
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoundBtn;