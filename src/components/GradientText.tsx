import React from 'react';
import { View, Text, StyleSheet, TextProps } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';


type GradientTextProps = TextProps &
  Pick<LinearGradientProps, 'colors' | 'start' | 'end' | 'locations'>;

export const GradientText: React.FC<GradientTextProps> = ({
  style,
  children,
  colors = ['#E5C990', '#E4B046'],
  start,
  end,
  locations,
  ...rest
}) => (
  <View style={styles.wrap}>
    <Text
      {...rest}
      style={[
        style,
        styles.shadow,
      ]}
    >
      {children}
    </Text>

    <MaskedView
      maskElement={
        <Text {...rest} style={[style, { color: '#000' }]}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        locations={locations}
      >
        <Text {...rest} style={[style, { opacity: 0 }]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  </View>
);

const styles = StyleSheet.create({
  wrap: { alignSelf: 'flex-start' },
  shadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    textShadowColor: 'rgba(0,0,0,0.32)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    color: 'transparent',
  },
});