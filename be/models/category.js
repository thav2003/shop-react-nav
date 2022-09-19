import {DataTypes} from 'sequelize';

export function Categorymodel(sequelize){
    const attributes = {
        // Model attributes are defined here
        category_id: {
            type: DataTypes.BIGINT(11) ,
            autoIncrement: true,
            primaryKey: true,
           
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            
     
        },
        description:{
            type: DataTypes.STRING,
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

    return sequelize.define('Categorys', attributes);
}