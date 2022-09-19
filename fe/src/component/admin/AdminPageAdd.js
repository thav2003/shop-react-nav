import React,{useState,useEffect,useCallback} from "react";
import { StatusBar, View,StyleSheet,TouchableOpacity,Image,ActivityIndicator } from "react-native";
import {
    Button,
    Divider,
    Input,
    StyleService,
    Text,
    Icon,Modal,Card
  } from "@ui-kitten/components";
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from "react-native-gesture-handler";
import signpage_styles from "../../styles/signpage_styles";



//import hook
import {addProduct,addImgCate} from "../../api/product"
import { getCategory } from "../../api/category";

const AdminPageAdd=()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [image, setImage] = useState('');
    const [imgCate,setImgCate] = useState('');
    const [popData,setPopData] = useState('');
    const [visible, setVisible] = React.useState(false);
    
    const [sendRequest, setSendRequest] = useState(false)
    const [sendR,setR]= useState(false)
    useEffect(()=>{
        if(sendR){
            addImg();
            setR(false)
        }
        
    },[sendR])
    useEffect(()=>{
        if(sendRequest){
            add();
            setSendRequest(false);
        }
        
    },[sendRequest])

    const openImageLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
    
        if (status === 'granted') {
          const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
          });
    
          if (!response.cancelled) {
            setImage(response.uri);
          }
        }
    };
    const openImageCateLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
    
        if (status === 'granted') {
          const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
          });
    
          if (!response.cancelled) {
            setImgCate(response.uri);
          }
        }
    };
    const clear=()=>{
        setName('')
        setPrice('')
        setDiscount('')
        setBrand('')
        setCategory('')
        setDescription('')
        setAmount('')
        setImage('')
    };
    const addImg=()=>{
       
        console.log((popData))
        const form = new FormData()
        form.append('id',popData)
        form.append('category_img', {
            name:imgCate,
            uri: imgCate,
            type: 'image/jpg',
        });
        
        addImgCate(form).then(response=>{
            alert(response.message);
            setVisible(false)
            //setPopData('')
        })
        
        
    };
    const add=()=>{
        setIsLoading(true);
        const formData = new FormData()
        formData.append('name',name)
        formData.append('price',parseFloat(price))
        formData.append('amount',parseInt(amount,10))
        formData.append('category',category.toUpperCase())
        formData.append('brand',brand)
        formData.append('description',description)
        formData.append('discount',parseFloat(discount))
        formData.append('product_img', {
            name:image,
            uri: image,
            type: 'image/jpg',
        });
        //console.log(image)
        addProduct(formData).then(response=>{
            alert(response.message);
            //console.log(response.notice)
            if(response.notice!==undefined){
                setPopData(response.notice)
                setVisible(true)
                setIsLoading(false);
            }
            setIsLoading(false);
           
        })
        clear()      
    }
    if (isLoading) {
        
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#5500dc" />
          </View>
        );
      }


    return(
        <>
        <StatusBar barStyle={"light-content"} />
        <ScrollView>
            <View style={{
                margin:10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Input
                    placeholder='tên sản phẩm'
                    label='Tên sản phẩm'
                    value={name}
                    onChangeText={(text)=>setName(text)}
                />
                <Input
                    style={signpage_styles.formInput}
                    placeholder='giá tiền'
                    label='Giá tiền'
                    value={price}
                    returnKeyType="next"
                    onChangeText={(text)=>setPrice(text)}
                />
                <Input
                    style={signpage_styles.formInput}
                    placeholder='số lượng'
                    label='Số lượng'
                    value={amount}
                    returnKeyType="next"
                    onChangeText={(text)=>setAmount(text)}
                />
                <Input
                    style={signpage_styles.formInput}
                    placeholder='category'
                    label='Categoty'
                    value={category}
                    returnKeyType="next"
                    onChangeText={(text)=>setCategory(text)}
                />
                <Input
                    style={signpage_styles.formInput}
                    placeholder='brand'
                    label='Brand'
                    value={brand}
                    returnKeyType="next"
                    onChangeText={(text)=>setBrand(text)}
                />
                <Input
                    style={signpage_styles.formInput}
                    placeholder='mô tả'
                    label='Mô tả'
                    value={description}
                    returnKeyType="next"
                    onChangeText={(text)=>setDescription(text)}
                />
                <Input
                    style={signpage_styles.formInput}
                    placeholder='discount'
                    label='Discount'
                    value={discount}
                    returnKeyType="next"
                    onChangeText={(text)=>setDiscount(text)}
                />
               
                <TouchableOpacity
                    onPress={openImageLibrary}
                    style={styles.uploadBtnContainer}
                    >
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <Text style={styles.uploadBtn}>Upload Product Image</Text>
                    )}
                </TouchableOpacity>
            </View>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
            >
                <View style={styles.container}>
                <TouchableOpacity
                    onPress={openImageCateLibrary}
                    style={styles.uploadBtnContainer}
                    >
                    {imgCate ? (
                        <Image
                            source={{ uri: imgCate }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <Text style={styles.uploadBtn}>Upload Category Image</Text>
                    )}
                </TouchableOpacity>
                <Button
                    style={signpage_styles.signUpButton}
                    size='large'
                    onPress={()=>setR(true)}>
                    ADD
                </Button>
                </View>
            </Modal>
            <Button
                style={signpage_styles.signUpButton}
                size='large'
                onPress={()=>setSendRequest(true)}>
                ADD
            </Button>
        </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    uploadBtnContainer: {
        height: 150,
        width: 150,
        marginTop:16,
        //borderRadius: 125 / 2,
        borderStyle: 'dashed',
        borderWidth: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:10
    },
    uploadBtn: {
        textAlign: 'center',
        fontSize: 16,
        opacity: 0.3,
        fontWeight: 'bold',
        
    },
    backdrop: {
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      container: {
        height: 350,
        width: 350,
        justifyContent: 'center',alignItems: 'center'
  
      },

  });

  
export default AdminPageAdd;