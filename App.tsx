import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import {HomeScreen} from './src/screens';

const SplashScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Bienvenido a la App</Text>
  </SafeAreaView>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <SplashScreen /> : <HomeScreen />;
};

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

export default App;
