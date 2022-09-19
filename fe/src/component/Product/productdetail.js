import React, { Fragment } from 'react';
import {List,ListItem,Text,TopNavigation,TopNavigationAction,Icon,Divider,Input,BottomNavigation,
    Button,ButtonGroup,

} from "@ui-kitten/components";

import { View,SafeAreaView,StatusBar,ImageBackground, TouchableWithoutFeedback ,ActivityIndicator} from "react-native";
import { ScrollView } from "react-native-gesture-handler";


import {AddCart} from "../../api/cartapi"

import { useSelector } from 'react-redux'

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
  );
const BackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
);



const ProductDetail = ({navigation,route,item})=>{
    const [count, setCount] = React.useState(0);
    const data=item.data;
    const user = useSelector(state => state.user)
    console.log(data)
    const renderFakeItem = ({ item, index }) => (

        <ListItem title={`${item.title} ${index + 1}`} onPress={() => alert("product detail")}/>

    );
    const handleAddition=()=>{
        if(count+1<=data.amount){
            setCount(count+1)
        }
    }
    const handleSubtraction=()=>{
        if(count)
        setCount(count-1)
    }



    const handleClick = () =>{
        if(user!="Guest"){
        Object.assign(data, {amount: count},{email:user});
        //console.log(data)
        if(count){
            AddCart(data).then(response=>
                alert(response))
                navigation.navigate("Home")
        }else{
            alert("Số lượng không hợp lệ")
        }}else{
            alert("Vui lòng đăng nhập")
        }
        
    }

    return(
        <Fragment>
            <StatusBar  barStyle={"light-content"}/>
            <SafeAreaView style={{ flex:1 }}>
            
                <ImageBackground
                            style={{    
                            height: 200,
                            flexDirection: "row",
                            alignItems: "center",}}
                            source={require("../../../assets/logo.jpg")}
                />
                <View style={{flexDirection: "column",}}>
                    <View >
                        <View style={{flexDirection: "row",justifyContent:"center",alignItems:"center",}}>
                            <View style={{width:"80%"}}> 
                                <Text
                                    category='h1'
                                    style={{margin:10,fontSize: 24}}
                                >{data.name}</Text>
                            </View>
                            
                            <View style={{flexGrow:2}}>
                                <Text
                                category='p2'
                                style={{margin:10,fontSize: 16}}
                                >{data.price}đ
                                </Text>
                            </View>
                            
                            
                        </View>
                        
                        <Text
                            category='p2'
                            style={{margin:10}}>{data.description}
                        </Text>
                    </View>

                </View>
                <Divider style={{height:2}} />
                <View >
                    <Text style={{margin:10}}>Tùy chọn</Text>
                </View>
            </SafeAreaView>
            <BottomNavigation appearance='noIndicator' style={{height:100}}>
                    <View style={{backgroundColor:"#DCDCDC",flexDirection:"row",alignItems: "center",justifyContent:"center"}}>
                    
                        <View style={{
                            flexGrow:6,
                            flexDirection:"row",
                            alignItems: "center",
                            justifyContent:"center"}}>
                            <Button size='small'
                                onPress={handleSubtraction}
                            >-</Button>

                            <Text style={{padding:10}}>{count}</Text>

                            <Button size='small'
                                onPress={handleAddition}
                            >+</Button>
                        </View>


                        <View style={{flexGrow:4,padding:10}}>
                                <Button ize='medium' onPress={handleClick}>Thêm</Button>
                        </View>

                    </View>
            </BottomNavigation>
        </Fragment>
    )

}


export default ProductDetail;