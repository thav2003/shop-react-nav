import {DataTypes} from 'sequelize';

export function Productmodel(sequelize){
    const attributes = {
        // Model attributes are defined here
        product_id: {
            type: DataTypes.BIGINT(11) ,
            
            autoIncrement: true,
            primaryKey: true,
           
        },
        brand_id: {
            type: DataTypes.BIGINT(11) ,
        
        },
        category_id: {
            type: DataTypes.BIGINT(11) ,  
        },
        name: {
            type: DataTypes.STRING,
     
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
        amount:{
            type: DataTypes.INTEGER,
            defaultValue:1
        },
        image: {
            type: DataTypes.STRING
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

    return sequelize.define('Products', attributes);
}