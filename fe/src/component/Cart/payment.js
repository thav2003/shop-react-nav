import React,{useState} from 'react';
import {SafeAreaView, StatusBar,View,StyleSheet} from "react-native";
import {  Button,Text, Card } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";

const INIT_STATE={
    TIENMAT:"Tiền mặt",
    ATM:"ATM Card",
    VM:"VISA/MASTER",
    MOMO:"Ví MoMo"
}


const PaymentPage=({navigation,route})=>{
    const [type,setType]=useState(INIT_STATE)
    console.log(route)
    const tienmat=()=>{
        route.params.callback(type.TIENMAT)
        navigation.goBack()
    }
    const atm=()=>{
        route.params.callback(type.ATM)
        navigation.goBack()
    }
    const visa=()=>{
        route.params.callback(type.VM)
        navigation.goBack()
      
    }
    const momo=()=>{
        route.params.callback(type.MOMO)
        navigation.goBack()
    }
    return(
        <SafeAreaView>
            <View style={{margin:10,}}>
                <TouchableOpacity onPress={tienmat}>
                    <Card style={styles.card}>
                        <Text style={{fontSize: 18}} >{type.TIENMAT}</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={atm}>
                    <Card style={styles.card}>
                        <Text style={{fontSize: 18}}>{type.ATM}</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={visa}>
                    <Card style={styles.card}>
                        <Text style={{fontSize: 18}}>{type.VM}</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={momo}>
                    <Card style={styles.card}>
                        <Text style={{fontSize: 18}}>{type.MOMO}</Text>
                    </Card>
                </TouchableOpacity>
       
              
            </View>
            
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    card:{
        marginTop:10
    }
})

export default PaymentPage;