import  {Sequelize} from 'sequelize';
import {Usermodel} from '../models/users.js';
import {Productmodel} from '../models/products.js';
import {Categorymodel} from '../models/category.js';
import {Ordermodel} from '../models/order.js'
import {Orderitemmodel} from '../models/orderitem.js'
import {Cartmodel} from '../models/cart.js'
import {Cartitemmodel} from '../models/cartitem.js'
import {Brandmodel} from '../models/brand.js'
import {UserPermissionmodel} from '../models/userpermission.js'
import { Permissionmodel } from '../models/permission.js';
import {Productreviewmodel} from '../models/productreview.js'
export const db ={};
export const sequelize= new Sequelize({
    dialect:'sqlite',
    storage:'../database.sqlite',
    pool: {
        max: 30,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
initialize();

async function initialize() {

    // init models and add them to the exported db object
    db.User = Usermodel(sequelize);
    db.Product = Productmodel(sequelize);
    db.Category = Categorymodel(sequelize);
    db.Cartitem= Cartitemmodel(sequelize);
    db.Cart= Cartmodel(sequelize);
    db.Order= Ordermodel(sequelize);
    db.Orderitem= Orderitemmodel(sequelize);
    db.Brand= Brandmodel(sequelize);
    db.Review=Productreviewmodel(sequelize);
    //db.UserPermission= UserPermissionmodel(sequelize);
    //db.Permission= Permissionmodel(sequelize)
    //connect table
    /* Table A to B and D
    ModelA.hasOne(ModelB);
    ModelA.hasOne(ModelD);

    // Table B to A (parent) and C (child)
    ModelB.belongsTo(ModelA);
    ModelB.hasOne(ModelC);

    // Table C to B (parent)
    ModelC.belongsTo(ModelB);

    // Table D to A (parent)
    ModelD.belongsTo(ModelA);*/
    db.Category.hasOne( db.Product,{foreignKey:"category_id"});
    db.Product.belongsTo(db.Category,{foreignKey:"category_id"});
    db.Brand.hasOne( db.Product,{foreignKey:"brand_id"});
    db.Product.belongsTo(db.Brand,{foreignKey:"brand_id"});

    
    db.Cart.hasMany(db.Cartitem,{foreignKey:"cart_id"})
    db.Cartitem.belongsTo(db.Cart,{foreignKey:"cart_id"})
    db.Cartitem.belongsTo(db.Product,{foreignKey:"product_id"})
   



    // sync all models with database
    sequelize.sync();
    
}
