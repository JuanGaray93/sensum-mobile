import React, { useRef, useState, useEffect } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Text } from 'native-base';
import { observer } from 'mobx-react';
import Sensations from '../model/Sensations';
import {
  ColorPalette,
  Typography
} from '../../assets/styles/SensumTheme';
import { calculateMessageText } from '../util/styleHelpers';

// min opacity
// duration is in miliseconds
export const AnimatedSensation = observer(() => {
  // animationValue will be used as the value for opacity. Initial Value: 0
  const durationInMiliseconds = 2500;
  const animationValue = useRef(new Animated.Value(0.05)).current;
  const [max, setMax] = useState(1);
  
  useEffect(() => {
    fadeingAnimation()
  }, [max])
  
  const fadeingAnimation = () => {
    Animated.timing(animationValue, {
      toValue: max,
      duration: durationInMiliseconds,
      easing: Easing.linear
    }).start(() => {
      if (max == 1) {
        setMax(0.05);
      } else {
        setMax(1);
      }
    });
  };

  return (
    <Animated.View style={{ opacity: animationValue }}>
      <Text multiline 
            textBreakStrategy="balanced"
            allowFontScaling
            includeFontPadding={false}
            maxFontSizeMultiplier={2}
            adjustsFontSizeToFit
            style={styles.message(
              Sensations.current.message.length,
              shouldBeDenied(Sensations.current),
              isTrending(Sensations.current)
            )}> {Sensations.current.message}
      </Text>
    </Animated.View>
  );
});

function isTrending(sensation) {
  const dislikes = (sensation.dislikes === 0) ? 1 : sensation.dislikes;
  return sensation.likes >= (dislikes * 5);
}

function shouldBeDenied(sensation) {
  return sensation.dislikes > sensation.likes;
}

const styles = StyleSheet.create({
  message: (length, denied = false, trending = false) => ({
    marginTop: calculateMessageText(length),
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 23,
    fontFamily: Typography.fontFamilyLight,
    color: denied ? ColorPalette.secondary : ColorPalette.light,
    flexGrow: 1,
    textDecorationLine: denied ? 'line-through' : 'none'
  }),
});
