import React,{useState,useEffect,Fragment} from 'react';
import { StyleSheet, View,ActivityIndicator,TouchableOpacity } from 'react-native';
import {  Button,Text, Input, Icon, List,ListItem,Card } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import Chart from './BarChart'

import {getSales} from '../../api/product'

import {HOST} from "../../../config"

const AdminSales=({navigation,route})=>{
    const [values,setValue]=useState([])
    const [label,setLabel]=useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalOut,setTotalOut] = useState()
    const [totalIn,setTotalIn] = useState()
    const [totalCurrent,setTotalCurrent] = useState()
  
    useEffect(()=>{
        navigation.addListener('focus', () => {  
            loadData();
        }); 
        setInterval(()=>{
            loadData();
        },60000)
        
    },[])
      const loadData=()=>{
        
        fetch(`http://${HOST}:4000/shop/chart`)
        .then(response => response.json())
            .then(res => {  
                setTotalOut(res.totalout)
                setTotalIn(res.totalin)
                setTotalCurrent(res.totalcurrent)
                setValue(res.total)
                setLabel(res.time)
                setIsLoading(false)    
          })
            .catch(err => {
            setIsLoading(false);
            setError(err);
            });
      
        
       
      }
   
    if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#5500dc" />
          </View>
        );
    }
    if (error) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>{
              setError(null);
              loadData()}}
            >
            <Text style={{ fontSize: 18}}>
              Oops... Check your network connection!
            </Text>
            </TouchableOpacity>
          </View>
        );
      }
        
    if(!isLoading && !error){
        const data={
            labels: label.length>1 && label instanceof Array ?  label :[0],
            datasets: [{
                data: values.length>1 && values instanceof Array ? values :[0],
                color: (opacity = 1) => `rgba(19, 155, 255, ${opacity})`
            }]
        }
        return (
          <Fragment>
            <ScrollView>
            <View>
              <Card>
                  <View style={{ flexDirection:"row"}}>
                    <Text style={{flexGrow:1}}>Tổng nhập kho</Text>
                    <Text style={{flexShrink:1}}>{totalIn}</Text>
                  </View>
              </Card>
              <Card>
                  <View style={{ flexDirection:"row"}}>
                    <Text style={{flexGrow:1}}>Tổng xuất kho</Text>
                    <Text style={{flexShrink:1}}>{totalOut}</Text>
                  </View>
              </Card>
              <Card>
                  <View style={{ flexDirection:"row"}}>
                    <Text style={{flexGrow:1}}>Tổng tồn kho</Text>
                    <Text style={{flexShrink:1}}>{totalCurrent}</Text>
                  </View>
              </Card>
            </View>
            <View style={styles.container}>
                <Chart data={data}/>
            </View>
            </ScrollView>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default AdminSales;