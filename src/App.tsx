import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import {HomeScreen} from './screens/HomeScreen';
import {SunIcon} from './assets/svg';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const SplashScreen = () => (
  <SafeAreaView style={styles.container}>
    <SunIcon width={120} height={120} />
    <Text style={styles.text}>Bienvenido a ClimaYa</Text>
  </SafeAreaView>
);

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return showSplash ? (
    <SplashScreen />
  ) : (
    <GestureHandlerRootView>
      <HomeScreen />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
