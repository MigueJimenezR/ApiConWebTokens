import { Router } from "express";
const router = Router()
import * as productsCtrl from '../controllers/products.controller'
import { veryfyJwt, authSingup, readFiles } from '../middlewares'
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: 'files', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, file.originalname)
            // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 10000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(xml|rar|zip)$/)) { // upload only png and jpg format
            return cb('Error : Por favor agregue un archivo xml, rar o zip.');
        }
        cb(undefined, true)

    }
})

router.post('/uploadFile', imageUpload.single('file'), productsCtrl.createProducts)


//router.post('/', [veryfyJwt.verifyToken, veryfyJwt.isModerator, authSingup.checkRolesExisted, authSingup.checkDuplicateUsernameOrEmail], productsCtrl.createProducts)
//router.post('/', imageUpload.single('image'), productsCtrl.createProducts)
router.get('/', productsCtrl.getProducts)

router.get('/:productId', [veryfyJwt.verifyToken, veryfyJwt.isModerator], productsCtrl.getProductsbyId)

router.put('/:productId', [veryfyJwt.verifyToken, veryfyJwt.isModerator], productsCtrl.updateProductsById)

router.delete('/:productId', [veryfyJwt.verifyToken, veryfyJwt.isModerator], productsCtrl.deleteProductsById)

export default router;