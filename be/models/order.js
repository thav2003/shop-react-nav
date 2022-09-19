import {DataTypes} from 'sequelize';

export function Ordermodel(sequelize){
    const attributes = {
        // Model attributes are defined here
        order_id: {
            type: DataTypes.BIGINT(11) ,
            autoIncrement: true,
            primaryKey: true,  
        },
        user_id: {
            type: DataTypes.BIGINT(11) ,
        
        },
        session_id: {
            type: DataTypes.STRING ,
        
        },
        token:{
            type: DataTypes.STRING,
        },
        amount:{
            type: DataTypes.INTEGER,
        },
        status:{
            type: DataTypes.INTEGER,
   
        },  
        subtotal:{
            type: DataTypes.FLOAT,
       
            defaultValue:0
        },
        promo: {
            type: DataTypes.STRING ,
        
        },
        discount:{
            type: DataTypes.FLOAT,
       
            defaultValue:0
        },
        shipping:{
            type: DataTypes.FLOAT,
   
            defaultValue:0
        },
        tax:{
            type: DataTypes.FLOAT,
   
            defaultValue:0
        },
        grandtotal:{
            type: DataTypes.FLOAT,
   
            defaultValue:0
        },
        typePay: {
            type: DataTypes.STRING,
        }
    };
    /*const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    }*/

    return sequelize.define('Orders', attributes);
}