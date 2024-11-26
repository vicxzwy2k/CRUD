import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../instances/mysql'


export interface UsuarioInstance extends Model{
    id: number,
    nome: string,
    senha: string,
}

export const Usuario = sequelize.define<UsuarioInstance>("Usuario,",{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    nome:{
        type:DataTypes.STRING
    },
    senha:{
        type:DataTypes.STRING
    }
},{
    tableName:'usuarios',
    timestamps:false
})

export default Usuario;
