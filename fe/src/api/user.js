import {HOST} from "../../config.js"
export const DelUser =async (userid)=>{
    console.log(userid)
    const res=await fetch(`http://${HOST}:4000/shop/users/${userid}`,{
        method: 'DELETE',
    })
    const response = await res.json()
    return response
 
}
export const UpRole =async (userid)=>{
   
    const res=await fetch(`http://${HOST}:4000/shop/role`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userid)
    })
    const response = await res.json()
    return response
 
}
