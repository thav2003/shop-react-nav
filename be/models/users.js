import {DataTypes} from 'sequelize';

export function Usermodel(sequelize){
    const attributes = {
        // Model attributes are defined here
        user_id: {
            type: DataTypes.BIGINT(11) ,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue: null  
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue: null           
          // allowNull defaults to true
        },
        admin: {
            type: DataTypes.BIGINT(11),
            defaultValue:0 
        },
        Email:{
            type: DataTypes.STRING,
            allowNull: true
        },
        Password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Phone:{
            type: DataTypes.STRING,
            allowNull: true
        },
        Address:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null  
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

    return sequelize.define('Users', attributes);
}


