import React,{Fragment,useEffect,useState} from 'react';
import {SafeAreaView, StatusBar,View,TouchableHighlight,ActivityIndicator, RefreshControl } from "react-native";
import {  Button,Text, Input, Icon, List,ListItem,BottomNavigation, BottomNavigationTab,TopNavigation  } from "@ui-kitten/components";


import ProductBillCard from './productbillcard'



import {HOST} from "../../../config"

import { useSelector } from 'react-redux'
/*const data=new Array(30).fill({
    status:1,
    date:"2022-06-27",
    token:"d8609dde-4348-4949-bca6-9e0d0795012e",
    grandtotal:735006,
    typePay:"Tiền mặt",
    amount:4
})*/
const BillPage=({navigation})=>{
    /*const [data]=getBill()
    console.log(data)*/
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.user)
    
    const renderBillCard = ({ item, index }) => (
        <ProductBillCard data={item} navagation={navigation}/>
    );
    useEffect(()=>{
        navigation.addListener('focus', () => {  
            loadData({email:user});
        }); 
    },[])
   
    const loadData=(user)=>{
        setIsLoadingData(true);
        fetch(`http://${HOST}:4000/shop/bill`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(user),
        })
          .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoadingData(false);
        })
            .catch(err => {
            setIsLoadingData(false);
            setError(err);
        });
    }
    console.log(data)
    if(user==="Guest"){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18}}>
                Oops... Please Login!
              </Text>
            </View>
          );
      }
   

    return (
    <Fragment>
        <StatusBar  barStyle={"light-content"}/>
        <SafeAreaView style={{flex:1 }}>
            <TopNavigation
                title='Đơn hàng của tôi'
                alignment='center'    
            />
            <View style={{height:60,justifyContent:"center"}}>
                <Text style={{margin:10}}>Đơn hàng trước</Text>
            </View>
            <View style={{flex:1}}>
            
            <List
                style={{
                    maxHeight: "100%",
                    paddingVertical: 10
                }}
                data={data}
                renderItem={renderBillCard}
            />   
          </View>
            
            
            
            
        </SafeAreaView>
    </Fragment>
    )
}

export default BillPage;