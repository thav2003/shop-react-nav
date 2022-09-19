import React,{Fragment,useEffect,useState} from 'react';
import {SafeAreaView, StatusBar,View,TouchableHighlight,ActivityIndicator, RefreshControl ,StyleSheet} from "react-native";
import {  Button,Text, Input, Icon, List,ListItem,BottomNavigation, BottomNavigationTab,TopNavigation  } from "@ui-kitten/components";

import { ScrollView } from "react-native-gesture-handler";

import { io } from "socket.io-client";

import {HOST} from "../../../config"
import { useSelector } from 'react-redux'


const ChatBox=({navigation,route})=>{
    const [socket, setSocket] = useState(null);
    const [socketConnected, setSocketConnected] = useState(false);

    const [message,setMessage]=useState([])
    const [chatMessage,setChatMessage]=useState('')
    const [admin,setAdmin]=useState('admin')
    const user = useSelector(state => state.user)
    //socket.on('disconnect', () => console.log('disconnected'));
    useEffect(() => {
       
        setSocket(io(`http://${HOST}:4001`, {
            transports: ['websocket'],
            forceNew: true,
            upgrade: false,
        })) 
    },[])
    useEffect(() => {
        if (!socket) return;
     
        socket.on('connect', () => {
          setSocketConnected(socket.connected);
        });
        socket.on('disconnect', () => {
          setSocketConnected(socket.connected);
        });
     
      }, [socket])
    const handleSocketConnection = () => {
        if (socketConnected)
          socket.disconnect();
        else {
          socket.connect();
        }
      }
 
    const onNewMsg = () => {
        socket.on('chat message', (newmessage) => {
            setMessage([...message,newmessage]);
        },
        console.log(message)
    );
        
    };
      
    const sendMessage = () => {
        socket.emit('chat message', {
          from: user,
          text: chatMessage?chatMessage:'Hello',
          createdAt: new Date().now
        });
        setChatMessage('')
        onNewMsg()
      }
    const renderName = (name) => {
        return name !== user ? <Text style={{fontSize: 13, marginLeft: 5}}> {name} </Text> : null;
    }
    const renderChat = ({ item }) => {
        const cellStyle = {
            container: {
              justifyContent: 'center',
              alignItems: item.from === user ? 'flex-end' : 'flex-start',
            },
            textContainer: {
              maxWidth: '70%',
              marginHorizontal: 12,
              marginVertical: 5,
              paddingHorizontal: 13,
              paddingVertical: 8,
              backgroundColor: item.from === user ? '#2f73e0' : '#e2e2e2',
              borderRadius: 10,
            },
            text: {
              color: item.from === user ? '#ffffff' : '#282828',
              fontSize: 15,
            }
        }
      
        return(
        <View style={cellStyle.container}>
            {renderName(item.from)}
            <View style={cellStyle.textContainer}>
              <Text style={cellStyle.text}> {item.text} </Text>
            </View>
          </View>
        )
    };
    if(user=="Guest"){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18}}>
                Oops... Please login to Chat!
              </Text>
            </View>
          );
    }
    return(
        <SafeAreaView style={{flex: 1,marginTop:10}}>
           <List
                data={message}
                renderItem={renderChat}
                
                
            />
            <Input
                style={styles.sendBtn}
                autoCorrect={false}
                value={chatMessage}
                onSubmitEditing={() =>{
                    console.log(socket.id)
                    
                    sendMessage() 
                }}
                onChangeText={chatMessage => {
                    setChatMessage(chatMessage);
                }}
          />
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendBtn: {
      width: '100%',
      height: 50,
      borderWidth:2,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: '#2f73e0',
    },
    
  })

export default ChatBox;