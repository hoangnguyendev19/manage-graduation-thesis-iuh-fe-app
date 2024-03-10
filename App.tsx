/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/redux/store';
import NavigationRouter from './src/navigation/NavigationRouter';

const App: React.FC<{}> = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <NavigationRouter />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

AppRegistry.registerComponent('main', () => App);

export default App;
