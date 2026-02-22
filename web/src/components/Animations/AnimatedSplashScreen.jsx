import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const AnimatedSplashScreen = ({ onAnimationFinish }) => {
  // Shared Values for Animation
  const iconScale = useSharedValue(0);
  const iconOpacity = useSharedValue(0);
  const textPosition = useSharedValue(30);
  const textOpacity = useSharedValue(0);

  // Animation Styles
  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
    opacity: iconOpacity.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: textPosition.value }],
    opacity: textOpacity.value,
  }));

  useEffect(() => {
    // 1. Animate Icon
    iconScale.value = withDelay(100, withSpring(1, { damping: 10, stiffness: 100 }));
    iconOpacity.value = withDelay(100, withTiming(1, { duration: 500 }));

    // 2. Animate Text (comes slightly after icon)
    textPosition.value = withDelay(600, withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) }));
    textOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));

    // 3. End Animation Sequence
    const timeout = setTimeout(() => {
      // Use runOnJS to safely call the parent function from the animation thread
      if (onAnimationFinish) onAnimationFinish();
    }, 5000); // Wait 5 seconds total

    return () => clearTimeout(timeout);
  }, []);

  return (
    <LinearGradient
      // Deep Purple to Vibrant Violet Gradient
      colors={['#1a0033', '#4c1d95', '#8b5cf6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
         

<Image source={require('../../assets/images/Logo.png')} style={styles.icon} />        </Animated.View>

        <Animated.View style={animatedTextStyle}>
          <Text style={styles.title}>DecIMate</Text>
          <Text style={styles.subtitle}>Smart Decisions.</Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  contentContainer: {
    alignItems: 'center',
    padding:10,
  },
  iconContainer: {
    marginBottom: 20,
    shadowColor: "#a78bfa", // Purple glow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    borderRadius:"50%",
    shadowRadius: 20,
    elevation: 10,
  },
  icon: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'contain',
    borderRadius:"50%",
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'purple',
    alignSelf:'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: 'yellow',
    alignSelf:'center',
    marginTop: 5,
    textDecorationColor:'yellow',
    letterSpacing: 0.5,
  },
});

export default AnimatedSplashScreen;