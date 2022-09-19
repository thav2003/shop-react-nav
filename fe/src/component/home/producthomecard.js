import React,{useState,useEffect} from 'react';
import { Card, Text } from '@ui-kitten/components';

import {Dimensions,ImageBackground,View,Image} from "react-native";
import {Button,Icon}from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import {HOST} from "../../../config"
const ProductHomeCard=(props)=>{
    const {navigation,data}=props;
    const [img,setImg]=useState('')

    const imgAdress=data.image.split("\\")[1]
   
    const reader = new FileReader();
        reader.onloadend = () => {
        const base64data = reader.result;     
        setImg(base64data);           
    }
    const fetchImage = async () => {
        const res = await fetch(`http://${HOST}:4000/shop/${imgAdress}`);
        const imageBlob = await res.blob();    
        reader.readAsDataURL(imageBlob) 
      };
    useEffect(() => {
        fetchImage();
    }, []);
    return(
        <TouchableOpacity
        
         onPress={() => navigation.navigate('ProductDetail',{data})}>
            <Card >
                <View style={{flexDirection:"row" ,justifyContent:"center"}}> 
                    <View style={{margin:10,width:"70%"}}>
                        <View>
                            <Text numberOfLines={1} style={{flexWrap:"wrap",marginLeft:10}}>{data.name}</Text>
                            <Text numberOfLines={3} appearance='hint' style={{flexWrap:"wrap",marginLeft:10}}>{data.description}</Text>
                        </View>
                        <Text style={{flexWrap:"wrap",marginTop:10,marginLeft:10}}>{data.price}đ</Text>
                    </View>
                    <View style={{margin:10,width:"30%"}} >
                        {img ? (<Image style={{height: 100,width:100}} source={{uri:`${img}`}} />) :
                            (<ImageBackground style={{height: 100,width:100}} source={require("../../../assets/logo.jpg")} />)}
                    </View>     
                </View>        
            </Card>
        </TouchableOpacity>
    )
}


export default ProductHomeCard;