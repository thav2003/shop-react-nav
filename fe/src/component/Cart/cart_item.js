import React,{Fragment} from 'react';
import { View,SafeAreaView,StatusBar,FlatList ,ImageBackground,LogBox} from "react-native";
import {Text,List,ListItem,Avatar, Button,Divider} from "@ui-kitten/components"
import { ScrollView } from "react-native-gesture-handler";

import cartpage_styles from "../../styles/cartpage_styles";

import 'intl';
import 'intl/locale-data/jsonp/vi';



const ItemImage = (amount) => (
    //<ImageBackground source={props}></ImageBackground>
    <Fragment>
      <Text>x{amount}</Text>
    </Fragment>
  );
  const Money = (price) => (
   <Fragment>
      <Text >{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Text>
    </Fragment>
   
   
);



const CartItem=(props)=>{
    const {data} = props;
  // console.log(data)
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);

    return(
     <>
        <View >
            <Text style={{margin:10}}>Đơn hàng của bạn</Text>
            
            {data.map((item,index) =>
              <Fragment  key={index}>
                <ListItem
                 
                  title={`${item.name}`}
                  description={`${item.description}`}
                  accessoryLeft={ItemImage(item.amount)}
                  
                  accessoryRight={Money(item.price)}/>
                <Divider style={{height:2}} />
              </Fragment>
            )}  
        </View>
        
      </>
    )

}

export default CartItem;