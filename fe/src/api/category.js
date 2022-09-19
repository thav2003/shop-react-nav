import React,{useState} from "react";
import {HOST} from "../../config"
export const getCategory=async(data)=>{
    try{
        const res=await fetch(`http://${HOST}:4000/shop/category`)
        const rjson = await res.json();
        return rjson


    }catch(e){
        console.log(e)
    }
}