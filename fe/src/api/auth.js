
import {HOST} from "../../config"
export const signUpUser = async ( user ) => {
  try {
 
      const res=await fetch(`http:/${HOST}:4000/shop/register`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        })
        const data= await res.json()
        return data
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const loginUser = async (user) => {
  try {
    const res=await fetch(`http://${HOST}:4000/shop/login`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
      })
      const data= await res.json()
      return data.status
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const Auth = async (token) => {
  try {
    
      
  } catch (error) {
    return {
      error: error.message,
    }
  }
}