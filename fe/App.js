import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';


import MyDrawer from './src/routes/routes';


import { Provider } from "react-redux";
import store from './src/store/store';

export default function App() {
  return (
    <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <NavigationContainer>
            <MyDrawer/>
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
    </>
  );
}
