import {DataTypes} from 'sequelize';

export function UserPermissionmodel(sequelize){
    const attributes = {
        // Model attributes are defined here
        user_permission_id: {
            type: DataTypes.BIGINT(11) ,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false,
        },
        user_id: {
            type: DataTypes.BIGINT(11) ,
        },
        permisson_id: {
            type: DataTypes.BIGINT(11) ,
        },
        active: {
            type: DataTypes.BIGINT(11) ,
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

    return sequelize.define('UserPermissons', attributes);
}