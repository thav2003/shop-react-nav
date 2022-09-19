import {HOST} from "../../config.js"
export const addProduct =async (product)=>{
  //console.log(product)

    const res=await fetch(`http://${HOST}:4000/shop/products`,{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: product
    })
    const response = await res.json()
    return response
 
}
export const addImgCate =async (img)=>{
  //console.log(product)
  try{
    const res=await fetch(`http://${HOST}:4000/shop/category`,{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: img
    })
    const response = await res.json()
    return response
  }catch (error) {
    console.log(error)
  }
 
}
export const  getSales=async()=>{
  const res=await fetch(`http://${HOST}:4000/shop/chart`)
  const response = await res.json()
  return response
}