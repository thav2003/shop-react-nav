import React,{Fragment,useEffect,useState} from "react";
import {SafeAreaView, StatusBar,View,TouchableHighlight,ActivityIndicator, RefreshControl,TouchableOpacity } from "react-native";
import {  Button,Text, Input, Icon, List,ListItem,BottomNavigation, BottomNavigationTab  } from "@ui-kitten/components";
//import component
import Search__bar from "../search/searchbar";
import Category from '../Category/category';
import ProdcuDetail from '../Product/productdetail'
import ProductHomeCard from './producthomecard'


//import reducer
import {setUser} from '../../store/actions/index'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

//import style
import home_styles from "../../styles/home_styles";

// `http://${HOST}:4000/shop/logo.jpg`


import {HOST} from "../../../config"
import { ScrollView } from "react-native-gesture-handler";

const PersonIcon = (props) => (
    <Icon {...props} name='person-outline'/>
  );
  
  const BellIcon = (props) => (
    <Icon {...props} name='bell-outline'/>
  );
  
  const EmailIcon = (props) => (
    <Icon {...props} name='email-outline'/>
  );
  const HomeIcon = (props) => (
    <Icon {...props} name='home-outline'/>
  );


const HomePage=({navigation,route})=>{
   
  
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const [clicked, setClicked] = useState(false);
    const [searchPhrase, setSearchPhrase]=useState('')
    const [fullData,setFullData]=useState([])
    const [category,setCategory]= useState({})
    const user = useSelector(state => state.user)
    
    //console.log(fullData)
    //render item
    const renderFakeItem = ({ item}) => (
        <ProductHomeCard navigation={navigation} data={item}/>
    );
    const renderVerticalItem = ({ item, index }) => (
        <ListItem  title={`${item.name} ${index + 1}`}/>
      );


    const renderHorizonItem = ({item}) => {
      //console.log(category)
      return(
          <Category
          style={{
            marginVertical: 8,
            marginHorizontal: 16,
          }}
          data={category[item]}
          navigation={navigation}
          category={item}
          />  
      ) 
      };
      
    const renderHeader = () => (
        <React.Fragment>
          <Text style={home_styles.headerTitle} appearance='hint'>
            CATEGORY
          </Text>
          <List
            contentContainerStyle={home_styles.horizontalList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={Object.keys(category)}
            renderItem={renderHorizonItem}
          />
        </React.Fragment>
    );
    //fetch data
    useEffect(()=>{
      loadData();
    },[])
    useEffect(() => {
      if(!(Array.isArray(data) && !data.length)){
        
        const tmp={}
        data.forEach(item=>{
          if(tmp.hasOwnProperty(item.Category.name+"-"+`${item.Category.image}`)){
            tmp[item.Category.name+"-"+`${item.Category.image}`].push(item)
          }else{
            tmp[item.Category.name+"-"+`${item.Category.image}`] =[item]
          }
        })
        setCategory(tmp)
           
      }
    },[data])


    const loadData=()=>{
      setIsLoading(true);
      fetch(`http://${HOST}:4000/shop/products`)
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
        <>
        <Fragment>
            <StatusBar barStyle={"light-content"}/>
            <SafeAreaView style={{ margin: 5,flex:1 }}>
                <Search__bar 
                    searchPhrase={searchPhrase} 
                    setSearchPhrase={setSearchPhrase}
                    fullData={fullData}
                    
                    clicked={clicked}
                    setData={setData} 
                    setClicked={setClicked}
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
                    renderItem={renderFakeItem}
                    ListHeaderComponent={renderHeader}
                />           
            </SafeAreaView>
        </Fragment>
        </>
    )

}



export default HomePage;