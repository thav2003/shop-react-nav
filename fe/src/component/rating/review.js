import React,{useState,useEffect,Fragment}from 'react';
import {View,TouchableOpacity} from 'react-native'
import {Text,Icon,Input,List,Button} from '@ui-kitten/components'



import ReviewCard from './reviewProductCard'
import StarRating from './starRating'

import { useSelector } from 'react-redux'

import {Review,getReview} from '../../api/review'

/*const data=new Array(10).fill({
    name:"Zy Trần",
    date:"05/07/2022",
    description:"Không ngon"
})*/

const ReviewPage=({navigation,item})=>{
    const [rating,setRating] = useState(null)
    const info_item=item.data
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [text,setText]=useState('')
    const user = useSelector(state => state.user)
    const renderItem = ({item,index}) => (
        <Fragment key={index}>
        <ReviewCard  data={item}/>
        </Fragment>
    );
      
    const handleClick = () =>{
        const data={
            user:user,
            product_id:info_item.product_id,
            rating:rating,
            description:text 
        }
        
        Review(data).then(res=>{
            alert(res.message)
        })
        setRating(null)
        setText('')
    }
    useEffect(()=>{
        loadData();
        setInterval(()=>{
            loadData();
        },600000) 
            
   
    },[])
    
    const loadData = () =>{
        setIsLoading(true)
        getReview(info_item.product_id).then(data=>{
            //console.log(data)
            setData(data);
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            setError(err);
        });
    }

    return(
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <List
                
                    style={{
                    maxHeight: "100%",
                    paddingVertical: 10,}}
                    data={data}
                    renderItem={renderItem}
                   
                    />   
            </View>
            <View style={{margin:30,alignItems: 'center',justifyContent: 'center'}}>
                <Text style={{fontSize:18}}>Đưa ra đánh giá của bạn</Text>
                <StarRating
                    rating={rating}
                    setRating={setRating}
                />
                 <Input 
                    placeholder='Đánh giá về sản phẩm'
                    value={text}
                    style={{width:"80%",borderRadius:8}} 
                    onChangeText={(text)=>setText(text)}/>
                 <Button 
                    style={{marginTop:5}}
                    onPress={handleClick}
                >
                    Vote
                 </Button>
            </View>
            
        </View>
    )

}

export default ReviewPage;