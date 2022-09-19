import React,{Fragment, useState}from 'react';
import {View,TouchableOpacity} from 'react-native'
import {Text,Icon,Input} from '@ui-kitten/components'

const StarIcon = (props) => (
    <Icon {...props} name='home-outline'/>
);
const StarRating=(props)=>{
    const {rating,setRating} = props
   
    return (
        <View style={{justifyContent: 'center', alignItems: 'center',flexDirection: "row"}}>
            {[...Array(5)].map((star,i)=>{
                const rattingValue=i+1;
                    return(
                        <Fragment key={i}>
                        <TouchableOpacity 
                            style={{justifyContent: 'center', alignItems: 'center',padding:10 }}
                            onPress={() => setRating(rattingValue)}
                        >
                        <Icon style={{height:30,width:30}} fill={rating<rattingValue ? 'black' : 'yellow'} name='star'/>
                        </TouchableOpacity>
                        </Fragment>
                    )
            })}
        </View>
    )


}

export default StarRating;