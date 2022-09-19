import React,{useState,useEffect, useCallback} from "react";
import { StatusBar, View, ImageBackground, KeyboardAvoidingView,Image,SafeAreaView,TouchableOpacity,LogBox 
} from "react-native";
import { Button, Input, Text, Icon  } from "@ui-kitten/components";

import cartpage_styles from "../../styles/cartpage_styles";



const ArrowForwardIcon = (style) => <Icon {...style} name='arrow-forward-outline' />;
const CartShip=({navigation,route ,address,setAddress,setDistance})=>{
    
    const getAddress =(data) => {
        setAddress(data.text)
    }
    const getDistance =(dis) => {
        setDistance(dis)
    }
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
      ]);


    return(
        <View style={cartpage_styles.container}>
            <View style={{margin:10}}>
                <Image style={cartpage_styles.tinyLogo} source={require("../../../assets/logo.jpg")}/>
                <Text appearance='hint'>Tài xế đang đến</Text>
            </View>

            <View style={cartpage_styles.child}>
                
                <View style={{flexDirection:"row"}}>
                    <Text appearance='hint' style={{margin:5}}>Giao hàng đến</Text>
                    <Text style={{margin:5,paddingLeft:"20%"}}>Chỉnh sửa</Text>
                </View>
                
                <TouchableOpacity 
                    style={cartpage_styles.touch_addres}
                    onPress={() => navigation.navigate('BookMap',{
                        getAddress: getAddress,
                        getDistance:getDistance
                    })}>
                    <View style={{flexDirection:"row",paddingTop:10,paddingBottom:10}}>
                        <Text style={cartpage_styles.text}>{address === null ? "Adress" : address}</Text>
                        <Icon style={cartpage_styles.icon} name="arrow-ios-forward-outline" fill={"black"}/>
                    </View>
                </TouchableOpacity>
          
                
            </View>
            
            
        </View>
    )
}


export default CartShip;