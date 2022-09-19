import {DataTypes} from 'sequelize';

export function Cartitemmodel(sequelize){
    const attributes = {
        // Model attributes are defined here
        cart_item_id: {
            type: DataTypes.BIGINT(11) ,
            
            autoIncrement: true,
            primaryKey: true,   
        },
        product_id: {
            type: DataTypes.BIGINT(11) ,
            /*references:{
                model:"Products",
                key: 'product_id'
            }*/
        
        },
        cart_id: {
            type: DataTypes.BIGINT(11) ,
            /*references:{
                model: "Carts",
                key: 'cart_id'
            }*/
        
        },
        description: {
            type: DataTypes.STRING,
        },
        discount:{
            type: DataTypes.FLOAT,
       
            defaultValue:0
        },
        price:{
            type: DataTypes.FLOAT,
       
            defaultValue:0
        },
        amount: {
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        
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

    return sequelize.define('Cartitems', attributes);
}