import {DataTypes} from 'sequelize';

export function Permissionmodel(sequelize){
    const attributes = {
        // Model attributes are defined here
        permission_id: {
            type: DataTypes.BIGINT(11) ,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false,
        },
        name: {
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

    return sequelize.define('Permissons', attributes);
}