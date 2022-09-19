import {DataTypes} from 'sequelize';

export function Brandmodel(sequelize){
    const attributes = {
        // Model attributes are defined here
        brand_id: {
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

    return sequelize.define('Brands', attributes);
}