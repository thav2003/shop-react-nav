import {db} from '../db/db.js'
import jwt from 'jsonwebtoken';

export default{
    getAll,
    login,
    create,
    update,
    _delete,
    upRole,
};

async function getAll() {
    //const data=await db.User.findAll({ raw: true,});
    //console.log(data)
    return await db.User.findAll({ raw: true,});;
}


async function create(params) {
    if(!(params.Email.includes("@gmail")))
        return {message: "Invalid email",status: 0}
    if((params.Password.toString().length)<=8){
        return {message: "Invalid password",status: 0}
    }
    
    if (await db.User.findOne({ where: { Email: params.Email } })) {
        return {message:`Email ${params.Email} is already registered`,status: 0};
    }else{
        const user = new db.User(params)   
        await user.save();
        return {message:`Email ${params.Email} is registered`,status: 1};
    }
}

async function login(params) {
    try{
       const user= await db.User.findOne({ where: { Email:  params.Email, Password:  params.Password} })
    if( user){

        return {status: 1,email:user.Email};
    }else{
        return {status: 0};
    }
    }catch(e){
        console.log(e)
    }
}


async function update(user_id,params) {

}
async function upRole(params) {
    const {id} = params;
    const user =await  getUser(id)

    await user.update({admin:1})
    await user.save()
}



async function _delete(user_id) {
    const user = await getUser(user_id);
    await user.destroy();
    return{message: 'User deleted',status:1};
}

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) return{message:'User not found',status:0};
    return user;
}