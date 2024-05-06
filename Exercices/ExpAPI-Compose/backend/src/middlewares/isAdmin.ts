import { Request, Response, NextFunction } from 'express';
import { TiposUsuarios } from '../resources/tipoUsuario/tipoUsuario.constants';

function isAdmin (req: Request, res: Response, next: NextFunction) {
    if (req.session.tipoUsuario && req.session.tipoUsuario == TiposUsuarios.ADMIN) 
        next();
    else
        return res.status(403).json({ msg: 'Usuário não tem permissão para acessar este recurso.' });
}

export default isAdmin;