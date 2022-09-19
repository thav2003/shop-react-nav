import {db,sequelize} from '../db/db.js'
import { Op } from'sequelize'
import fs from 'fs'
import path from 'path';
export default{
    getAll,
    getBy,
    create,
    update,
    _delete,
    chart,
    createImg,
    review,
    getreview

};
async function getUser(email) {
    const user = await db.User.findOne({
        where:{
            Email: email
        }
    });
    if (!user) return{message:'User not found',status:0};
    return user;
}

async function getreview(id) {
    console.log(id)
    return await db.Review.findAll({
        where:{
            product_id:id
        }
    })
}
async function review(params) {
    const {user,product_id,rating,description} = params
    const User=await getUser(user)
    const username=User.firstName + ' ' + User.lastName
    const review = new db.Review({
        product_id:product_id,
        name:username,
        ratting: rating,
        description: description
    })
    await review.save()
}
async function getAll() {
    return await db.Product.findAll({
        where:{amount: {
            [Op.gt]:0
        }},
        nest:true,
        raw : true ,
        include:{
           model: db.Category,
           attributes:['category_id','name','image','description'],
        } ,
    });
}

async function getBy(name) {
    return await getProduct(name);
}

async function create(params,imgPath) {
    
    const {price,category,name,brand,description,discount,amount} = params;
    //console.log(params);
    try{
        const [findCate,findBrand]=await Promise.all([
            db.Category.findOne({where:{name:category}}),
            db.Brand.findOne({where:{name:brand}})
        ])
        if(findCate && findBrand ){
            const product = await db.Product.create({
                brand_id:findBrand.brand_id,
                category_id:findCate.category_id,
                name:name,
                description:description,
                discount:discount,
                price:price,
                amount:amount,
                image:imgPath
            })
            return {message:'Product created successfully',}
        }else if(findCate){
            const newbrand=await db.Brand.create({
                name:brand
            })
            const product = await db.Product.create({
                brand_id:newbrand.brand_id,
                category_id:findCate.category_id,
                name:name,
                description:description,
                discount:discount,
                price:price,
                amount:amount,
                image:imgPath
            })
            return {message:'Product created successfully'}
        }else if(findBrand){
            const newcategory=await db.Category.create({
                name:category
            })
            const product = await db.Product.create({
                brand_id:findBrand.brand_id,
                category_id:newcategory.category_id,
                name:name,
                description:description,
                discount:discount,
                price:price,
                amount:amount,
                image:imgPath
            })
            await product.save()
            return {message:'Provide img category',notice:product.category_id}
        }else{
            const newcategory=await db.Category.create({
                name:category
            })
            await newcategory.save()
            const newbrand=await db.Brand.create({
                name:brand
            })
            await newbrand.save()
            const product = await db.Product.create({
                brand_id:newbrand.brand_id,
                category_id:newcategory.category_id,
                name:name,
                description:description,
                discount:discount,
                price:price,
                amount:amount,
                image:imgPath
            })
            await product.save()
            return {message:'Provide img category',notice:product.category_id}
        }   
    }catch(err){
        console.log(err);
    }
   
}
async function createImg(params,imgPath){
    //onsole.log(imgPath)
   console.log(imgPath)
    const cate= await db.Category.findOne({
        where: {
            category_id:params.id
        }
    })
    await cate.update({
        image:imgPath
    })
    return {message:'add success'}
}

async function update(product_id, params) {
    const product = await getProduct(product_id);
    Object.assign(product, params);
    await product.save();
}

async function _delete(product_id) {
    const product = await getProduct(product_id);
    await product.destroy();
}



async function chart(){
    const product=await db.Product.findAll({raw: true,})
    const chart=await db.Order.findAll({raw: true})
    
    let total=[]
    let time=[]
    let totalout=0;
    let totalin=0;
    chart.forEach((item)=>{
        
        total.push(item.grandtotal)
        time.push(item.createdAt.toLocaleString().slice(9,14))
        totalout+=item.amount
    })
    product.forEach(item=>{
    
        totalin+=item.amount
    })
    if(total.length>6){
        total.slice(-6)
        time.slice(-6)
    }
  

    return {total: total,time: time,totalout: totalout,totalin:totalin,totalcurrent:totalin-totalout}
}


// helper functions

async function getProduct(name) {
    const product = await db.User.findAll({ where: { name: name} });
    if (!product) throw 'Product not found';
    return product;
}