import React,{Fragment,useEffect,useState} from "react";
import {List,ListItem,Text,TopNavigation,TopNavigationAction,Icon,Divider,Input} from "@ui-kitten/components";

import { View,SafeAreaView,StatusBar,ActivityIndicator,LogBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Location from 'expo-location';


import { useSelector } from 'react-redux'

//import component
import CartShip from './cart_ship';
import CartItem from './cart_item';
import CartBar from './cart_bar';

//import styles 
import cartpage_styles from "../../styles/cartpage_styles";

//import api
import  {GetCart}  from "../../api/cartapi";
import { set } from "react-native-reanimated";

import {HOST} from "../../../config"

import 'intl';
import 'intl/locale-data/jsonp/vi';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
  );
const FileIcon = (props) => (
    <Icon {...props} name='file-text-outline'/>
  );
const BackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
);

/*const data = new Array(10).fill({
    title: 'UI Kitten',
    description: 'A set of React Native components',
    price:20000,
    promo: 'mã giảm giá',
    image:require("../../../assets/sp.jpg")
});*/
// tỉnh thử vì subtotal sẽ lấy từ database
//let Subtotal = 0
//data.forEach(element => {
//    Subtotal += element.price;
//});




const CartPage=({navigation,route})=>{  
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData,setFullData] = useState([]);
    //const [promo,setPromo] = useState([])
    const [amount,setAmount] = useState(0);
    const [Subtotal,setSubtotal] = useState(0);
    const [address,setAddress]=useState(null)
    const [distance,setDistance]=useState(0);
    const [typePay,setTypePay] = useState('Tiền mặt')
    const user = useSelector(state => state.user)
 
    const promo=new Array(10).fill({
        promo:"mã giảm giá"
    })

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
      ]);
    
    useEffect(()=>{
        navigation.addListener('focus', () => {  
            loadData({email:user});
        }); 
    },[])
    const loadData=(user)=>{
        setIsLoadingData(true);
        fetch(`http://${HOST}:4000/shop/getcart`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(user),
            cache: "no-cache"
        })
          .then(response => response.json())
            .then(data => {
                setSubtotal(data.Subtotal)
                setData(data.product);
                setAmount(data.amount);
                setFullData(data);
                setIsLoadingData(false);
        })
            .catch(err => {
            setIsLoadingData(false);
            setError(err);
        });
    }
      
   const callback = (data) => {
    setAddress(data.text)
   }
    
    const renderPromo = ({ item, index }) => (
        <ListItem  title={`${item.promo} ${index + 1}`} style={{margin:15}}/>
    );
  

      if (isLoadingData  ) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#5500dc" />
          </View>
        );
      }
  
      if (error && user !=="Guest") {  
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
              Oops... Check your network connection!
            </Text>
          </View>
        );
      }
      if(data.length<=0 && user !=="Guest"){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18}}>
                Oops... Please add new Cart!
              </Text>
            </View>
          );
      }
      if(user==="Guest"){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18}}>
                Oops... Please Login!
              </Text>
            </View>
          );
      }
  
      
    return(
        <>
        <Fragment>
            <StatusBar  barStyle={"light-content"}/>
            <SafeAreaView style={{backgroundColor:"white",flex:1}}>
                <TopNavigation
                title='Trang thanh toán'
                alignment='center'
                
                />
                <Divider style={{height:2}} />
                
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                   
                >

                    <CartShip 
                        navigation={navigation} 
                        address={address} 
                        setAddress={setAddress}
                        distance={distance}
                        setDistance={setDistance}/>
                    <Divider style={{height:7}} />
                    <CartItem data={data}  />
                    
                    {/*=============== */}
                    <View>
                        <View style={{margin:10,flexDirection:"row",width:"90%"}}>
                            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                <Icon name='file-text-outline' fill='gray' style={{width: 25, height: 25,margin:10}}/>
                            </View>
                            
                            <View style={{ flexDirection: 'row' ,width:"90%"}}>
                                <Text style={{marginTop:10,flexShrink: 1}} appearance='hint'>Bạn có gì muốn nhắn tới cửa hàng</Text>
                            </View>
                            
                        </View>
                    <Divider style={{height:2}} />
                    </View>
                    {/*=============== */}
                    <View>
                        <View style={{ width:"90%",margin:10,flexDirection:"column"}}>

                            <View style={{flexDirection: "row"}}>
                                <View  style={{flexGrow:3}}>
                                    <Text style={{margin:10,}}>Tạm tính{`(${amount})`}</Text>
                                </View>
                                
                                <View>
                                    <Text style={{margin:10,}}>{Subtotal.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: "row"}}>
                                <View  style={{ flexGrow:3}}>
                                    <Text style={{margin:10,}}>Phí áp dụng: {`${distance}km`}</Text>
                                </View>
                                
                                <View >
                                    <Text style={{margin:10,}}>{(distance <= 1 ? 15000: distance*15000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                    <Divider style={{height:2}} />

                     {/*=============== */}
                    <View style={{height:100,alignItems:"center",justifyContent:"center"}} >
                        <View style={{margin:5,marginTop:7}}>
                        <List
                     
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={promo}
                        renderItem={renderPromo}
                        />
                        </View>
                    </View>
                 </ScrollView>
                 <Divider style={{height:2}} />
                 <CartBar 
                    navigation={navigation} 
                    data={fullData}
                    amount={amount}
                    address={address}
                    distance={distance}
                    Subtotal={Subtotal}
                    typePay={typePay}
                    setTypePay={setTypePay}/>
                
               
                
            </SafeAreaView>
        </Fragment>
            
        
        </>
    )
}

export default CartPage;