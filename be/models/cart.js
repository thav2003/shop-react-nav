import {DataTypes} from 'sequelize';

export function Cartmodel(sequelize){
    const attributes = {
        // Model attributes are defined here
        cart_id: {
            type: DataTypes.BIGINT(11) ,
            
            autoIncrement: true,
            primaryKey: true,   
        },
        user_id: {
            type: DataTypes.BIGINT(11) , 
            /*references:{
                model: "Users",
                key: 'user_id'
            }*/
        },
        session_id: {
            type: DataTypes.STRING ,
        
        },
        status:{
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

    return sequelize.define('Carts', attributes);
}