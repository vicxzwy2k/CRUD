import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario'; // Supondo que você tenha um modelo de Usuario

// Função para login
export const usuario = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const usuario = await Usuario.findOne({ where: { username } });

    if (!usuario) {
      // Se o usuário não existir, retorna erro
      res.status(400).json({ message: 'Usuário não encontrado' });
      return;
    }

    // Verificar se a senha fornecida bate com o hash da senha no banco de dados
    const senhaValida = await bcrypt.compare(password, usuario.senha);

    if (!senhaValida) {
      // Se a senha estiver incorreta, retorna erro
      res.status(400).json({ message: 'Senha incorreta' });
      return;
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: usuario.id, username: usuario.nome },
      'seu-segredo', // Chave secreta para assinar o token (guarde com segurança)
      { expiresIn: '1h' } // Tempo de expiração do token
    );

    // Enviar o token no corpo da resposta
    res.json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao tentar fazer login' });
  }
};

// Exemplo de função de logout (caso queira implementar)
export const logout = (req: Request, res: Response): void => {
  // No caso do JWT, apenas excluir o token do frontend
  res.json({ message: 'Logout realizado com sucesso' });
};
