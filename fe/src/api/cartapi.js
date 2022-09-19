import React,{useState} from "react";
import {HOST} from "../../config"
export const AddCart=async(data)=>{
    try{
        const res=await fetch(`http://${HOST}:4000/shop/addcart`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        const rjson = await res.json();
        return rjson.message


    }catch(e){
        console.log(e)
    }
}


export const BuyCart = async(data)=>{
    try{
        const res=await fetch(`http://${HOST}:4000/shop/order`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        const rjson = await res.json();
        return rjson


    }catch(e){
        console.log(e)
    }
}

