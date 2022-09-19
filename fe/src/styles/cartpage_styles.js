import { StyleSheet } from 'react-native';


const cartpage_styles= StyleSheet.create({
    container: {
        flexDirection: "row",    
    },
    tinyLogo: {
        width: 50,
        height: 50,
        margin:10
    },
    child: {
        flex: 2,
        margin:5,
        flexDirection: "column",
        alignItems: "flex-start",
        
    },
    icon:{
        width:20,
        height:20,
        margin:5, 
    },
    text: {
      margin:5,
      textAlign:"left",
      width:"80%",
    },
    touch_addres:{
        width:"100%",
        flexDirection: "row",
        
    },
    list: {
        maxHeight: 192,
    },
    
})


export default  cartpage_styles;