import {db} from '../db/db.js'
import { v4 as uuidv4 } from 'uuid';



export default{
    add,
    getcart,
    buy,
    getBill
};

async function add(req, res, next) {
    const data=req.body
 
    try {
        //console.log(req.data.data.product_id)

        //find cart
        
        const user=await db.User.findOne({where:{email:data.email}})
        const cart=await db.Cart.findOne({where:{session_id:user.Email,status:0,user_id:user.user_id}})
        //nếu cart tồn tại thì check xem cartitem,ko có cart thì tạo cart mới và cartitem mới
        if(cart){
            const item=await db.Cartitem.findOne({
                where:{
                    product_id:data.product_id,
                    cart_id:cart.cart_id,
            }})
            //nếu đã có thì update lại số lượng,ko có thì tạo cartitem mới
            if(item){
                await db.Cartitem.update({amount:data.amount},
                    {
                        where:{
                            product_id:data.product_id,
                            cart_id:cart.cart_id,
                        }
                    }
                )
            }else{
                await db.Cartitem.create({
                    product_id:data.product_id,
                    cart_id:cart.cart_id,
                    price:data.price,
                    amount:data.amount
                })
            }


           // console.log(cart.cart_id)
        }else{
            const newcart=await db.Cart.create({
                session_id:data.email,
                status:0,
                user_id:user.user_id
            })
            await newcart.save();
            await db.Cartitem.create({
                product_id:data.product_id,
                cart_id:newcart.cart_id,
                price:data.price,
                amount:data.amount
            })
            
        }

        }catch(err){
        return err.message;
    }

   

}
async function getUser(email) {
    
    const user = await db.User.findOne({where: {Email: email}});
    if (!user) return{message:'User not found',status:0};
    return user;
}
async function getcart(params) {
 
    const user=await getUser(params.email);
  
    const cart=await db.Cart.findAll({
        nest:true,
        raw : true ,
        where:{session_id:user.Email,status:0,user_id:user.user_id},
        include:{
           model: db.Cartitem,
           attributes:['product_id','description','discount','price','amount'],
        } ,
    })
    // list id và amount product
    const list={}
    let cart_id;
    let session_id;
    cart.forEach(item=>{
        if(list.hasOwnProperty(item.Cartitems.product_id)){
            list[item.Cartitems.product_id].push(item.Cartitems.amount)
        }
        else{
            list[item.Cartitems.product_id]=item.Cartitems.amount
        }
        cart_id=item.cart_id;
        session_id=item.session_id;
    })

    //lấy thông tin product và  amount
    const product=await db.Product.findAll({
        raw:true,
        where:{product_id:Object.keys(list)},
    })
    let Subtotal=0;
    let sl=0;
    product.forEach((item)=>{
        Object.assign(item,{amount:list[item.product_id]})
        sl+=item.amount
        Subtotal+=(item.amount*item.price)
    })
    console.log(session_id);
    return {
        product:product,
        Subtotal:Subtotal,
        cartId:cart_id,
        userId:user.user_id,
        session_id:session_id,
        amount:sl}
  
   
}
async function buy(params){
    console.log(params)
    const {cartId,userId,session_id,product,shipping,Grandtotal,Subtotal,amount,typePay} = params

    const cart=await db.Cart.findOne({where:{cart_id:cartId,status:0}})
    if(cart){
        const order=await db.Order.create({
            token:uuidv4(),
            user_id:userId,
            session_id:session_id,
            shipping:shipping,
            subtotal:Subtotal,
            grandtotal:Grandtotal,
            amount:amount,
            typePay:typePay,
            status:0}
        )
        await order.save()
       
        product.forEach(item=>{
            db.Orderitem.create({
                product_id:item.product_id,
                order_id:order.order_id,
                description:item.description,
                price:item.price,
                amount:item.amount,
            })
           
       })
       /*
            gọi api thanh toán,nếu thành công chuyển status sang 1,đang chờ thì status 2
            ...
            
        */
        await order.update({
                status:1,
        })
        
        await cart.update({
            status:1,
        })
       
        

       
        return {message:"Thanh toán thành công"}
    }else{
        return {message:"Không tìm thấy cart"}
    }
    
}

async function getBill(data){
    return await db.Order.findAll({
        where:{status:1,session_id:data.email }
    });
}

