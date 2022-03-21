import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller'
const router = Router()

//ingresar
router.post('/signup', authCtrl.singUp)
    //logearse
router.post('/signin', authCtrl.singin)

export default router;