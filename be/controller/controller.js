import  express from 'express';
import  productService from '../services/productService.js';
import userService from '../services/userService.js';
import cartService from '../services/cartService.js';
import categoryService from '../services/categoryService.js';
import multer from 'multer'
import path from 'path';
import fs from 'fs'
//middleware
import Auth from '../middleware/auth.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets')
    },
    filename: (req, file, cb) => {
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    //console.log(file)
    const fileTypes = /jpg|jpeg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)  
    const extname = fileTypes.test(path.extname(file.originalname))
    if(mimeType && extname) {
        return cb(null, true)
    }
    cb('Give proper files formate to upload')
}

const uploads = multer({ storage, fileFilter });

//product
router.get('/products',getAll);
router.get('/products/:name', getProduct);
router.post('/products/',uploads.single('product_img'),create);
router.put('/products/:id',  update);
router.delete('/products/:id', deleted);

//chart
router.get('/chart',getChart);


//category
router.post('/category/',uploads.single('category_img'),createImgCate);
router.get('/category/',getCategory);

//admin
router.get('/users',getAllUser);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deletedUser);


//auth
router.post('/register', createUser);
router.post('/login',loginUser);

//Role
router.post('/role',getRole);

//review
router.post('/review',createReview)
router.get('/review/:id',getReview)

//cart
router.post('/getcart',getCart)
router.post('/addcart',addCart);

//order
router.post('/order',order);
router.post('/bill',Bill);




function getCategory(req, res, next){
    categoryService.getCate().then(cates=>res.json(cates)).catch(next);
}


function getReview(req, res, next) {
    console.log(req.params.id)
    productService.getreview(req.params.id)
        .then(reviews => res.json(reviews))
        .catch(next);
}
function createReview(req, res, next) {
    //console.log(req.body)
    productService.review(req.body)
        .then(() => res.json({message:"Thank you"}))
        .catch(next);
}
function getRole(req, res, next) {
    //console.log(req.body)
    userService.upRole(req.body)
        .then(() => res.json({message:"Đã thăng chức"}))
        .catch(next);
}


function getAll(req, res, next) {
    productService.getAll()
        .then(products => res.json(products))
        .catch(next);
}

function getProduct(req, res, next) {
    productService.getBy(req.params.name)
        .then(products => res.json(products))
        .catch(next);
}

function create(req, res, next) {
    productService.create(req.body,req.file.path)
        .then(products => res.json(products))
        .catch(next);
}
function createImgCate(req, res, next){
  
    productService.createImg(req.body,req.file.path)
        .then(products => res.json(products))
        .catch(next);
}

function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Product updated' }))
        .catch(next);
}

function deleted(req, res, next) {
    productService._delete(req.params.id)
        .then(() => res.json({ message: 'Product deleted' }))
        .catch(next);
}
function getChart(req, res, next) {
 
    productService.chart()
        .then(charts => res.json(charts))
        .catch(next);
}

//=============================================//


async function getAllUser(req, res, next){
    
    res.setHeader("Content-Type", 'application/json');
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);


    
}
function createUser(req, res,next) {
    res.setHeader("Content-Type", 'application/json');
    userService.create(req.body)
        .then(users => res.json(users))
        .catch(next);
      
}
function loginUser(req, res, next){
    res.setHeader("Content-Type", 'application/json');
    userService.login(req.body)
        .then(users => res.json(users))
        .catch(next)
}



function updateUser(req, res, next) {

}

function deletedUser(req, res, next) {
    console.log(req.params.id)
    userService._delete(req.params.id)
        .then(users => res.json(users))
        .catch(next);
}
//=============================================//

function addCart(req, res, next) {
    
    cartService.add(req, res, next)
        .then(response => res.json({ message: 'Add success' }))
        .catch(next)
}
function getCart(req, res, next) {
    
    cartService.getcart(req.body)
        .then(cart => res.json(cart))
        .catch(next)
}
function order(req, res, next) {
  
    cartService.buy(req.body)
        .then(order => res.json(order))
        .catch(next)
}
function Bill(req, res, next) {
    cartService.getBill(req.body)
        .then(bill => res.json(bill))
        .catch(next)
}




export default router;



