import {DataTypes} from 'sequelize';

export function Productreviewmodel(sequelize){
    const attributes = {
        // Model attributes are defined here
        review_id: {
            type: DataTypes.BIGINT(11) ,
            autoIncrement: true,
            primaryKey: true,
           
        },
        product_id: {
            type: DataTypes.BIGINT(11) ,    
        },
        name: {
            type: DataTypes.STRING,
        },
        ratting:{
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING,
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

    return sequelize.define('ProductReviews', attributes);
}