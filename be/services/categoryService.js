import {db} from '../db/db.js'

export default{
    getCate,
};

async function getCate(){
    return await db.Category.findAll({attributes: ['name']});
}