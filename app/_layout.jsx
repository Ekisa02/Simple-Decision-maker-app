import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import AnimatedSplashScreen from "../components/Animations/AnimatedSplashScreen";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // This is where you would load fonts or make API calls
        // We add a small artificial delay to ensure the native splash shows briefly
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the app that resources are loaded
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // This function is passed to the AnimatedSplash component
  // It runs when the animation completes
  const handleAnimationFinish = useCallback(async () => {
    setShowAnimation(false);
    await SplashScreen.hideAsync(); // Hide the native splash screen
  }, []);

  // If app isn't ready OR animation is still running, show the custom Splash
  if (!appIsReady || showAnimation) {
    return (
      <AnimatedSplashScreen onAnimationFinish={handleAnimationFinish} />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}