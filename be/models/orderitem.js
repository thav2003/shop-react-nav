import {DataTypes} from 'sequelize';

export function Orderitemmodel(sequelize){
    const attributes = {
        // Model attributes are defined here
        order_item_id: {
            type: DataTypes.BIGINT(11) ,
            
            autoIncrement: true,
            primaryKey: true,   
        },
        product_id: {
            type: DataTypes.BIGINT(11) ,
        
        },
        order_id: {
            type: DataTypes.BIGINT(11) ,
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

    return sequelize.define('Orderitems', attributes);
}