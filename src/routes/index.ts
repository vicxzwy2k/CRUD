import { Router } from "express"
import * as produtoController from '../controllers/produtoController'
import * as authController from '../controllers/authController'


const router = Router()

router.get('/',(req,res) =>{
    res.send('TESTE')
})

router.get('/produtos',produtoController.index)

router.get('/cadastrar',produtoController.visualizarPaginaCadastro)

router.post('/cadastrar',produtoController.cadastroProduto)

router.get('/editar/:id',produtoController.editaProduto)

router.post('/editar/:id',produtoController.atualizarProduto)

router.get('/excluir/:id',produtoController.deletarProduto)

router.get('/usuario',authController.usuario)



export default router