import React,{useState,useEffect} from 'react';
import { Card, Text } from '@ui-kitten/components';

import {Dimensions,ImageBackground,View} from "react-native";
import {Button,Icon}from "@ui-kitten/components";

import {HOST} from "../../../config"

import {AddCart} from "../../api/cartapi"

import { useSelector } from 'react-redux'

const CartIcon = (props) => (
    <Icon {...props} name='shopping-cart-outline'/>
);

const ProducCard =(props)=>{
    const {data,navigation} = props;
    const [img,setImg]=useState(data.image.split("\\")[1])
    const user = useSelector(state => state.user)
    //console.log(img)
    const BuyClick=()=>{
      
        if(user!="Guest"){
            Object.assign(data, {amount: 1},{email:user});
            //console.log(data)
            
            AddCart(data).then(response=>
                    alert(response))
            
        }else{
            alert("Vui lòng đăng nhập")
        }
            
        
    }
    const renderItemHeader = (img) => (
        <ImageBackground style={{height: 140,}} source={{uri:`${img}`}} />
      );
    const renderItemFooter = (data) => (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
        }}>
          <Text category='s1'>{data.price}đ</Text>
          <Button
            style={{paddingHorizontal: 0,width:60}}
            size='small'
            accessoryRight={CartIcon}
            onPress={BuyClick}
          />
        </View>
    );
    const reader = new FileReader();
        reader.onloadend = () => {
        const base64data = reader.result;     
        setImg(base64data);           
    }
    const fetchImage = async () => {
        const res = await fetch(`http://${HOST}:4000/shop/${img}`);
        const imageBlob = await res.blob();    
        reader.readAsDataURL(imageBlob) 
      };
    useEffect(() => {
        fetchImage();
    }, []);
    return(
        <Card style={{
            margin: 8,
            width: Dimensions.get("window").width / 2 -16,
            }}
            onPress={()=>navigation.navigate('ProductDetail',{data})}
            header={() => renderItemHeader(img)}
            footer={() => renderItemFooter(data)}
        >
            <View style={{height:50}}>
                <Text category='s1' numberOfLines={2} style={{flexGrow:1}}>{data.name}</Text>
                <Text appearance='hint' category='c1' numberOfLines={1}>
                    {data.description}
                </Text>
            </View>
        </Card>
    )

}

export default ProducCard;