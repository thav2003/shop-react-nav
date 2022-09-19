import React,{useState,useEffect} from 'react'
import { View, Animated, StyleSheet,StatusBar,ActivityIndicator ,LogBox ,Keyboard} from 'react-native'
import * as Location from 'expo-location';
import MapView,{ Marker } from 'react-native-maps'
import {Input, Text ,Icon,Button} from "@ui-kitten/components";
import {getPreciseDistance } from 'geolib';

const SHOP_ADRESS={
    "latitude": 10.859365776820876,
    "latitudeDelta": 0.01612347146150661,
    "longitude": 106.76641864702106,
    "longitudeDelta": 0.010000281035900116,
}
const StarIcon = (props) => (
    <Icon {...props} name='star'/>
  );


const BookMap=({navigation,route})=>{
    const mapView = React.useRef();

    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [location, setLocation] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    const [textAddress, setTextAddress] = React.useState('');
    const [distance,setDistance] = React.useState(0);

 
    const [coordinate,setCoordinate]= useState(SHOP_ADRESS)//marker shop

    const [query, setQuery] = useState('')
    const [newcoord,setNewCoord]=React.useState(null);//marker user
    //console.log(input)
    /*const newcoord=await Location.geocodeAsync(textAddress)
    setNewCoord(newcoord)*/

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
      ]);
    
    useEffect(()=>{
        navigation.addListener('focus', () => {  
            fetchLocation()   
        }); 
        
    },[])
    const handlePosition=(region)=>{
        setNewCoord(region)
        fetchAddress(region)
        calculate(SHOP_ADRESS,region)
    }
    async function fetchAddress(region){
        const Address = await Location.reverseGeocodeAsync(region);
        setTextAddress(`${Address[0].name} ${Address[0].street} ${Address[0].subregion} ${Address[0].region}`) 
    }
   
    async function fetchLocation () {
        setIsLoadingLocation(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        const location = await Location.getCurrentPositionAsync({});
        Object.assign(location.coords,{"latitudeDelta": 0.01,"longitudeDelta": 0.01,})
        setLocation(location.coords);
        const address = await Location.reverseGeocodeAsync(location.coords);
        setAddress(address[0]);
        setTextAddress(`${address[0].name} ${address[0].street} ${address[0].subregion} ${address[0].region}`)
        setIsLoadingLocation(false);
    }
    const calculate=async (shop,user)=>{
        const dis=getPreciseDistance(
            {latitude:shop.latitude,longitude:shop.longitude},
            {latitude:user.latitude,longitude:user.longitude}
        )
        //giá trị dis là mét => quy đổi thành km
        setDistance(dis/1000);
    }
    const Submit=()=>{
        let queryAddress=query;
        if(!queryAddress.includes("Thủ Đức Thành Phố Hồ Chí Minh")){
            queryAddress+=" Thủ Đức Thành Phố Hồ Chí Minh"
        }
        Location.geocodeAsync(queryAddress).then(response=>{
            Object.assign(response[0],{"latitudeDelta":0.01,"longitudeDelta":0.01})
            mapView.current.animateToRegion(response[0])
        })
        setQuery('')
        Keyboard.dismiss()
    }

    const handleClick=()=>{
        //console.log(distance);
        route.params.getAddress({text:textAddress})
        route.params.getDistance(distance)
        navigation.goBack()
        
    }
    if ( isLoadingLocation ) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#5500dc" />
          </View>
        );
      }
   
    return(
        <>
        <StatusBar barStyle={"light-content"}/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <MapView
                ref={mapView}
                initialRegion={location}
                onRegionChangeComplete={(region) => handlePosition(region)}
                style={{position: 'absolute',top: 0,left: 0,bottom: 0, right: 0}}
                zoomEnabled={true}
            >
                {coordinate!==null && (<Marker coordinate={coordinate}/>) }
                {newcoord!==null && (<Marker coordinate={newcoord}/>) }
            </MapView>
            
            <View style={{position: 'absolute',top:10,width:"100%"}}>
            <Input
                style={{
                    borderRadius: 10,
                    margin: 10,
                    color: '#000',
                    borderColor: '#666',
                    backgroundColor: '#FFF',
                    borderWidth: 1,
                    height: 45,
                    paddingHorizontal: 10,
                    fontSize: 18,
                    flex: 1,
                }}
                value={query}
                onChangeText={(text)=>setQuery(text)}
                onSubmitEditing={Submit}
                returnKeyType="done"
                autoCapitalize="none"
                autoCorrect={false}
                allowFontScaling={false}
                numberOfLines={1}
                placeholder={`${textAddress.replace("null","")}`}
                placeholderTextColor={'#666'}
            />
            </View>  
            
        </View>
        <View>
            <Button  accessoryRight={StarIcon} onPress={handleClick}>
                Xác nhận 
            </Button>
        </View>
        </>

    )


}

export default BookMap;


