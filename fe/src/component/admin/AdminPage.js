import React,{Fragment,useState,useEffect} from "react";
import { StatusBar,SafeAreaView, View,StyleSheet,TouchableOpacity,Image,ActivityIndicator,RefreshControl } from "react-native";
import {
    Button,
    Divider,
    Input,
    StyleService,
    Text,
    Icon,
    List,
    ListItem,Modal,Card,Avatar 
  } from "@ui-kitten/components";
import Searchbar from'./searchbar'
import {HOST} from "../../../config"
//import style
import home_styles from "../../styles/home_styles";


import {DelUser,UpRole} from '../../api/user'

//tk bunny2804@gmail.com
//mk 123456789


const AdminPage=({navigation,route})=>{
    const [clicked, setClicked] = useState(false);
    const [searchPhrase, setSearchPhrase]=useState('')
    const [fullData,setFullData]=useState([])
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [visible, setVisible] = React.useState(false);
    const [popData,setPopData]=useState(null);
  
    const [loading,setLoading]= useState(false);

    const DeleteButton=()=>{
        setIsLoading(true)
        setLoading(true)
        DelUser(popData.user_id).then(res=>{
            alert(res.message)
            setIsLoading(false)
            setLoading(false)
        })
        setPopData(null)
        setVisible(false)
    }
    const UpRoleButton=()=>{
        console.log(popData.user_id)
        setIsLoading(true)
        setLoading(true)
        UpRole({id:popData.user_id}).then(res=>{
            alert(res.message)
            setIsLoading(false)
            setLoading(false)
        })
        setPopData(null)
        setVisible(false)
        
    }
    const renderVerticalItem = ({ item, index }) => (
        
        <ListItem  
            title={`${item.firstName} ${item.lastName}`}
            description={`${item.Email}`}
            accessoryLeft={renderItemIcon}
            accessoryRight={renderItemAccessory(item)}
        />
      
      );
      
    const renderItemAccessory = (data) => (
        <Fragment>
            <Button 
                size="tiny"
                onPress={()=>{
                    //console.log(data)
                    setPopData(data)
                    setVisible(true)
                }}
            >XEM</Button>
        </Fragment>
    );

    const renderItemIcon = (props) => (
        <Icon {...props} name='person'/>
    );

    useEffect(()=>{
        navigation.addListener('focus', () => {  
            loadData();
        }); 
    },[])
    const loadData=()=>{
        setIsLoading(true);
        fetch(`http://${HOST}:4000/shop/users`)
          .then(response => response.json())
            .then(data => {
          
              setData(data);
              setFullData(data);
              setIsLoading(false);
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
      if(loading){
        loadData()
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

    return(
        <Fragment>
            <StatusBar barStyle={"light-content"}/>
            <SafeAreaView style={{ margin: 5,flex:1 }}>
                
                <Searchbar
                    searchPhrase={searchPhrase} 
                    setSearchPhrase={setSearchPhrase}
                    clicked={clicked}
                    setClicked={setClicked}
                    fullData={fullData}
                    setData={setData} 
                />
                <List
                    refreshControl={
                      <RefreshControl 
                        onRefresh={loadData}
                        refreshing={isLoading}
                      />
                    }
                    style={home_styles.list}
                    data={data}
                    renderItem={renderVerticalItem}
                />  
                <Modal
                    visible={visible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => {
                        setPopData(null)
                        setVisible(false)
                    }}>
                    <View style={styles.container}>
                        <Card disabled={true}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Avatar
                                    style={{
                                        height: 80,
                                        width: 80,
                                    }}
                                    source={require('../../../assets/mylove.jpg')}
                                />
                            </View>
                           <View 
                                style={{
                                    justifyContent: 'center', alignItems: 'center'
                                }}
                            >
                                <Text>{popData && (`${popData.firstName} ${popData.lastName}`)}</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <View style={{flexGrow:1}}>
                                    <Text style={styles.Label}>First name:</Text>
                                </View>
                                <View style={{flexShrink:1}}>
                                    <Text style={styles.infotext}>{popData && (`${popData.firstName}`)}</Text>
                                </View>
                            </View>
                            <View style={styles.viewInfo}>
                                <View style={{flexGrow:1}}>
                                    <Text style={styles.Label}>Last name:</Text>
                                </View>
                                <View style={{flexShrink:1}}>
                                    <Text style={styles.infotext}>{popData && (`${popData.lastName}`)}</Text>
                                </View>
                            </View>
                            <View style={styles.viewInfo}>
                                <View style={{flexGrow:1}}>
                                    <Text style={styles.Label}>Email:</Text>
                                </View>
                                <View style={{flexShrink:1}}>
                                    <Text style={styles.infotext}>{popData && (`${popData.Email}`)}</Text>
                                </View>
                            </View>
                            <View style={styles.viewInfo}>
                                <View style={{flexGrow:1}}>
                                    <Text style={styles.Label}>Phone number:</Text>
                                </View>
                                <View style={{flexShrink:1}}>
                                    <Text style={styles.infotext}>{popData && (`${popData.Phone==null ? '': (popData.Phone) }`)}</Text>
                                </View>
                            </View>
                            <View style={styles.viewInfo}>
                                <View style={{flexGrow:1}}>
                                    <Text style={styles.Label}>Address:</Text>
                                </View>
                                <View style={{flexShrink:1}}>
                                    <Text style={styles.infotext}>{popData && (`${popData.Address==null ? '': (popData.Address) }`)}</Text>
                                </View>
                            </View>
                            <View style={styles.viewInfo}>
                                <View style={{flexGrow:1}}>
                                    <Text style={styles.Label}>Role:</Text>
                                </View>
                                <View style={{flexShrink:1}}>
                                    <Text style={styles.infotext}>{popData&&(popData.admin ? "nhân viên":"khách hàng")}</Text>
                                </View>
                            </View>
                        </Card>
                      
                        <Card >
                            <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                            <Button 
                                style={styles.button}
                                onPress={DeleteButton}
                            >
                                Xóa
                            </Button> 
                            <Button 
                                style={styles.button}
                                onPress={UpRoleButton}>
                                Cấp quyền
                            </Button> 
                            </View>
                        </Card>
                    </View>
                </Modal>

            </SafeAreaView>
        </Fragment>
    )
}
const styles = StyleSheet.create({
    container: {
      height: 350,
      width: 350,

    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    button:{
        width:130
    },
    viewInfo:{
        flexDirection: "row",        
    },
    Label: {
        fontSize:18
    },
    infotext:{
        fontSize:16,
        color:"red",
    }
  });
  
export default AdminPage;