import * as React from 'react';
import { NavigationContainer ,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { Divider, Drawer, DrawerItem,Icon, TabBar, Tab,Text } from "@ui-kitten/components";
import { StyleSheet,ImageBackground,LogBox ,View,TouchableOpacity} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LoginPage from "../component/auth/loginpage"
import SignupPage from "../component/auth/signuppage"
import HomePage from "../component/home/homepage"
import ProductDetail from "../component/Product/productdetail"
import CartPage from "../component/Cart/cartpage"
import ProductList from '../component/Product/productlist'
import BookMap from '../component/shipper/bookcar'
import BillPage from '../component/HistoryBill/Bill'
import PaymentPage from '../component/Cart/payment'
import AdminPageAdd from '../component/admin/AdminPageAdd'
import AdminPage from '../component/admin/AdminPage'
import AdminSales from '../component/admin/AdminSales'
import ChatBox from '../component/Chatbox/contact'
import ReviewPage  from '../component/rating/review';


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import {setUser} from '../store/actions/index'


const Stack = createNativeStackNavigator();
const { Navigator, Screen } = createDrawerNavigator();
const Tabs = createMaterialTopTabNavigator();

import {ADMIN} from '../../config'

const BellIcon = (props) => (
    <Icon {...props} name='bell-outline'/>
  );
const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-forward-outline'/>
  );
const HomeIcon = (props) => (
    <Icon {...props} name='home-outline'/>
  );
const LogoutIcon = (props) => (
    <Icon {...props} name='log-out-outline'/>
  );
const CartIcon = (props) => (
    <Icon {...props} name='shopping-cart-outline'/>
  );
const BillIcon = (props) => (
    <Icon {...props} name='clipboard-outline'/>
  );
const AdminIcon = (props) => (
    <Icon {...props} name='person-outline'/>
  );
const PhoneIcon = (props) => (
    <Icon {...props} name='phone-outline'/>
  );
const ProductIcon = (props) => (
    <Icon {...props} name='cube-outline'/>
  );
const SaleIcon = (props) => (
    <Icon {...props} name='car-outline'/>
  );


  const AdminTabBar = ({ navigation, state }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(null);
  
    const navigate = (index) => {
      setSelectedIndex(index);
      //console.log("routeNames", state.routeNames);
      //console.log("routeNames", index);
      navigation.navigate(state.routeNames[index]);
    };
    return(
    <TabBar
      selectedIndex={state.index}
      onSelect={index => navigate(index)}>
      <Tab title='Admin' icon={AdminIcon}/>
      <Tab title='Product' icon={ProductIcon}/>
      <Tab title='Sales' icon={SaleIcon}/>
 
    </TabBar>
    )
  };
  
  const AdminStack = ({ navigation, state }) => (
    <Tabs.Navigator 
      tabBar={props => <AdminTabBar {...props} />}
      initialRouteName='AdminPage'
    >
      <Screen name='AdminPage' component={AdminPage}/>
      <Screen name='AddProduct' component={AdminPageAdd}/>
      <Screen name='AdminSales' component={AdminSales}/>

    </Tabs.Navigator>
  );

  const ProductDetailTopBar = ({ navigation, state }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(null);
  
    const navigate = (index) => {
      setSelectedIndex(index);
      //console.log("routeNames", state.routeNames);
      //console.log("routeNames", index);
      navigation.navigate(state.routeNames[index]);
    };
    return(
    <TabBar
      selectedIndex={state.index}
      
      onSelect={index => navigate(index)}>
      <Tab title='Detail' icon={AdminIcon}/>
      <Tab title='Review' icon={ProductIcon}/>
 
    </TabBar>
    )
  };


const ProductDetailStack=({ navigation, route }) =>{
  return(
    <Tabs.Navigator 
    tabBar={props => <ProductDetailTopBar {...props} />}
    initialRouteName='Detail'
  >
    <Screen name='Detail'>
      {props => <ProductDetail item={route.params} {...props} navigation={navigation}/>}
    </Screen>
    <Screen name='Review'>
      {props => <ReviewPage item={route.params} {...props} navigation={navigation}/>}
    </Screen>
  </Tabs.Navigator>
  )
}


const CartStack=() =>{
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
    
  return (
    <Stack.Navigator
      initialRouteName="CartPage"
    >
      <Stack.Screen name ="CartPage" component={CartPage}
        options={{ headerShown:false }} />
      <Stack.Screen name ="BookMap" component={BookMap} />
      <Stack.Screen name ="PaymentPage" component={PaymentPage} />
       
    </Stack.Navigator>
  )
}


const MainStack = () => {
    return (
        <Stack.Navigator
          initialRouteName="Home"
        >
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{ headerShown:false }}
          />
          <Stack.Screen name="ProductDetail" component={ProductDetailStack} />
          <Stack.Screen name="ProductList" component={ProductList} />
        </Stack.Navigator>
     
    );
};

const AuthStack=()=>{

  
    return (
      
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} options={{ headerShown:false }} />
          <Stack.Screen name="Register" component={SignupPage} options={{ headerShown:false }} />
        </Stack.Navigator>
     
    );
}
const Header = (props) => {   
  const user = useSelector(state => state.user)
 
  return(
    <React.Fragment>
      <ImageBackground
        style={[props.style, styles.header]}
        source={require("../../assets/logo.jpg")}
      />
      <Divider />
      <View style={[props.style]}>
      <Text style={{textAlign: "center",color:"green"}}>{user}</Text>
      </View>
      <Divider />
    </React.Fragment>
  )
};

const DrawerContent = ({ navigation, state }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const user = useSelector(state => state.user)
    const dispatch= useDispatch()
    const navigate = (index) => {
      setSelectedIndex(index);
      if(state.routeNames=="Logout")dispatch(setUser(email.value))
      //console.log("routeNames", state.routeNames);
      //console.log("routeNames", index);
      navigation.navigate(state.routeNames[index.row]);
    };
    return (
      <Drawer
        header={Header}
        selectedIndex={selectedIndex}
        onSelect={(index) => navigate(index)}>
        <DrawerItem
          title='Home'
          accessoryLeft={HomeIcon}
          accessoryRight={ForwardIcon}
        />
        <DrawerItem
          title='Cart'
          accessoryLeft={CartIcon}
          accessoryRight={ForwardIcon}
        />
        <DrawerItem
          title='Bill'
          accessoryLeft={BillIcon}
          accessoryRight={ForwardIcon}
        />
        {user==ADMIN&&
        <DrawerItem
          title='Admin'
          accessoryLeft={AdminIcon}
          accessoryRight={ForwardIcon}
        />}
        <DrawerItem
          title='Contact'
          accessoryLeft={PhoneIcon}
          accessoryRight={ForwardIcon}
        />
        <DrawerItem
          title='Login'
          accessoryLeft={BellIcon}
          accessoryRight={ForwardIcon}
        />
       
        <DrawerItem title='Logout' accessoryLeft={LogoutIcon} />
       
      </Drawer>
    );
  };

const MyDrawer = ()=>{
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const user = useSelector(state => state.user)
    return( 
        <Navigator 
            initialRouteName="Main" 
            drawerContent={(props) => <DrawerContent {...props}/>}
        >
            <Screen name="Main" component={MainStack} 
                options={{
                    headerShown:false,
                
            }}/>
            <Screen name='Cart' component={CartStack}
                options={{
                  headerShown:false,
            }}/>
            <Screen name='Bill' component={BillPage}
                options={{
                  headerShown:false,
            }}/>
            {user==ADMIN&&
            <Screen name='Admin' component={AdminStack}
                options={{
                  headerShown:false,
            }}/>
            }
            <Screen name='Contact' component={ChatBox}
                options={{
                  headerShown:false,
            }}/>
            <Screen name='Auth' component={AuthStack}
                options={{
                  headerShown:false,
                  swipeEnabled:false,
              
            }}/>
            
            <Screen name='Logout' component={AuthStack} 
       
                options={{
                headerShown:false,
                
            }} />
            
        </Navigator>
    )
}

export default MyDrawer;


const styles = StyleSheet.create({
    header: {
      height: 250,
      flexDirection: "row",
      alignItems: "center",
    },
  });