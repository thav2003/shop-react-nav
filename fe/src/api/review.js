
import {HOST} from "../../config.js"

export const Review =async (data)=>{
   
    const res=await fetch(`http://${HOST}:4000/shop/review`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const response = await res.json()
    return response
}
export const getReview =async (id)=>{
    console.log(id)
    const res=await fetch(`http://${HOST}:4000/shop/review/${id}`)
    const response = await res.json()
    return response
}