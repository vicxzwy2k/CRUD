import {Request, Response} from 'express'
import {Produto} from '../models/Produto'
import { where } from 'sequelize'

export const index = async (req: Request, res:Response) =>{

    let products = await Produto.findAll()

    res.render('pages/produtos',{
        products
    })
}
export const visualizarPaginaCadastro = async (req:Request,res:Response)=>{
    res.render('pages/cadastrar')
}
export const cadastroProduto = async(req:Request, res:Response) =>{
    //recebendo os dados de form via body
    let {nome,valor,quantidade} = req.body

    if(nome && valor && quantidade){
        await Produto.create({
            nome,
            valor,
            quantidade
        })
    }
    //após cadastrar vai redirecionar para a rota produtos
    res.redirect('/produtos')
}
export const editaProduto = async(req:Request, res:Response) =>{
    let {id} = req.params
    let product = await Produto.findByPk(id)
    res.render('pages/editar',{
        product,
        id
    })
}
export const atualizarProduto = async(req:Request, res:Response) =>{
    let {id} = req.params
    let {nome,valor,quantidade} = req.body

    await Produto.update({
        nome,
        valor,
        quantidade
    },{
        where:{
            id:id
        }
    })
    res.redirect('/produtos')
}



export const deletarProduto = async (req: Request, res: Response) => {

    let { id } = req.params;  // Pegando o id do produto da URL
  
      // Deleta o produto baseado no ID
      const produtoDeletado = await Produto.destroy({
        where: {
          id: id  // Condição para deletar o produto com o ID fornecido
        }
      });


    res.redirect('/produtos');  // Redireciona para a lista de produtos após a deleção
};
  



