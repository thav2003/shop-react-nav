import { Text } from "@ui-kitten/components";
import React,{useState,useEffect} from "react";
import { StyleSheet ,ImageBackground,View} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


import {HOST} from "../../../config"
const Category=(props)=>{
    const { style, category, navigation,data } = props;
    //console.log(props.category.getCategoryStruct)
    const [img,setImg]=useState(category.split("-")[1])
    const imgAdress=img.split("\\")[1]
    //console.log(data)
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
    return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductList", {
              data:data
            })}
        >
        <ImageBackground
            imageStyle={{ borderRadius: 6}}
            style={[style, styles.container, styles.image,]}
            source={{uri:`${img}`}}>
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor:  "rgba(0, 0, 0, 0.45)" },
                ]}
            />
           
            <Text style={styles.title} category='h2'status='control' >
              {category.split("-")[0]}
            </Text>
          
        </ImageBackground>
        </TouchableOpacity>
      );
};

export default Category;

const styles = StyleSheet.create({
    container: {
      height: 200,
      width:200
    },
    image: {
      height: 150,
      paddingVertical: 24,
      paddingHorizontal: 16,
    },
    title: {
      zIndex: 1,
    
    },
  });
