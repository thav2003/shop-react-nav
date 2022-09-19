import React,{useState}from 'react';
import {View,TouchableOpacity,Dimensions} from 'react-native'
import {Text,Icon,Input,Card} from '@ui-kitten/components'



const ReviewCard=(props)=>{
    const {data} = props
    return(
        <Card style={{
            margin: 8,
            backgroundColor: "background-basic-color-1",}}>
            <View style={{ flexDirection: "row"}}>
                <Text style={{fontSize: 16}}>{data.name} </Text>
                <Text appearance='hint'> {data.date}</Text>
            </View>
            <View style={{ marginTop:10}}>
                <Text style={{fontSize: 18,flexShrink:1}}>{data.description}</Text>
            </View>
            
        </Card>
    )
}
export default ReviewCard