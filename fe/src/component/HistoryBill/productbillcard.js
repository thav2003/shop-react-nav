import React,{Fragment} from 'react';
import { Card, Text,Divider,Icon ,Button} from '@ui-kitten/components';

import {Dimensions,ImageBackground,View} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

import 'intl';
import 'intl/locale-data/jsonp/vi';

const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-forward-outline'/>
  )
  

const ProductBillCard=(props)=>{
    const {navigation,data}=props;
   const date=data.createdAt.slice(0,10)
  
   
    return(
    <Fragment>
        <View style={{backgroundColor:"white"}}>
            <Card>
                <View style={{flexDirection:"row"}}>
                        <Text>{data.status==1?"Đã giao" : "Lỗi"} * </Text>
                        <Text appearance='hint'>{`${date}`}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={{flexGrow:3}}>
                        <View>
                            <Text style={{textAlign:"center",}}>Mã bill</Text>
                            <Text numberOfLines={1} style={{fontSize:18,}}>{data.token}</Text>
                            <Text style={{textAlign:"left",}}>{`${data.grandtotal.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}(${data.typePay}) * ${data.amount} món`}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Icon style={{height:30,width:30}} fill='gray' name='arrow-ios-forward-outline'/>
                    </View>
                </View>
            </Card>
            <Divider style={{height:2}}/>
            <View style={{justifyContent: 'center', alignItems: 'center',height:35 }}>
                <Text onPress={() => console.log(data)}>Đặt lại</Text>
            </View>
        </View>
        <Divider style={{height:30}}/>
    </Fragment>
    )

}

export default ProductBillCard;