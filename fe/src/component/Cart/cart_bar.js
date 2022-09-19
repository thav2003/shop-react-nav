import React from "react";
import { View,SafeAreaView,StatusBar,LogBox} from "react-native";
import {Text,BottomNavigationTab,BottomNavigation,Divider ,Button,Icon} from '@ui-kitten/components'
import { TouchableOpacity } from "react-native-gesture-handler";

import {BuyCart} from "../../api/cartapi"

import 'intl';
import 'intl/locale-data/jsonp/vi';

const PersonIcon = (props) => (
    <Icon {...props} name='person-outline'/>
  );
  const BellIcon = (props) => (
    <Icon {...props} name='arrow-ios-upward-outline'/>
  );
const CartBar=({navigation,route,Subtotal,distance,data,address,amount,typePay,setTypePay})=>{
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
      ]);
    const callback = (text) => (
        setTypePay(text)
    )
    const shipping = distance<=1 ? 15000:distance * 15000
    const Grandtotal = data.Subtotal+ shipping
    const handleClick = () =>{
        if(address!==null){

            Object.assign(data,{
                Grandtotal:Grandtotal,
                shipping:shipping,
                amount:amount,
                typePay:typePay
            });  
            BuyCart(data).then(response =>{
                alert(response.message);
                navigation.goBack();
                  
            })
        }else{
            alert(`vui lòng chọn địa chỉ`)
        }
    }
    return(
        <BottomNavigation appearance='noIndicator' style={{height:120}}>
            <View >

                <View style={{flexDirection:"row",alignContent:"center",justifyContent:"center"}}>
                    <View style={{width:"50%"}}>
                        <TouchableOpacity onPress={() =>navigation.navigate("PaymentPage",{
                            callback:callback
                        })}>
                            <Button  
                                accessoryRight={BellIcon} 
                                appearance='ghost'
                                >
                                {typePay}</Button>
                        </TouchableOpacity>
                        
                    </View>
                    <View
                        style={{
                        borderLeftWidth: 2,
                        borderLeftColor: 'gray',
                        }}
                    />
                    <View style={{width:"50%",alignContent:"center",justifyContent:"center"}}>
                        <TouchableOpacity onPress={() =>console.log(typePay)}>
                            <Text style={{textAlignVertical: "center",textAlign: "center",color:"blue"}}>ADD PROMO</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>


                <View style={{flexDirection:"row",alignContent:"center",justifyContent:"center"}}>
                    <View style={{width:"40%",padding:10}}>
                        
                        <Text  appearance='hint' style={{paddingBottom:5}}>Tổng cộng</Text>
                        <Text>{Grandtotal.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Text>
                    </View>
                    <View style={{width:"60%",alignContent:"center",justifyContent:"center"}}>
                        <Button
                            onPress={handleClick}
                        >Đặt hàng</Button>
                    </View>
                    
                </View>
            </View>
          
        </BottomNavigation>
    )

}

export default CartBar;