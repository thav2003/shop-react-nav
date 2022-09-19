import React from "react";
import {TopNavigation,List,ListItem,TopNavigationAction,Icon,Text} from "@ui-kitten/components"

import ProductCard from "./productcard"
import {SafeAreaView, View,StyleSheet,Dimensions,TouchableOpacity,Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";




const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
  );
const BackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
);



const ProductList = ({navigation,route}) => {
    const {data,category}=route.params;
    //console.log(data);

    const renderProduct=({item,index}) =>{
       //console.log(item)
       return(
            <ProductCard   data={item} navigation={navigation}/>
        )
    }

    return (
        <React.Fragment>
          <SafeAreaView style={styles.container} >
           
            <List
                data={data}
                keyExtractor={(_, i) => i}
                numColumns={2}
                style={styles.listContainer}
                renderItem={renderProduct}
            />
            
          </SafeAreaView>
        </React.Fragment>
    );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    listContainer: {
        maxHeight:"100%",  
        backgroundColor: "white"   
    },
  });
export default ProductList;