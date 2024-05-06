import { Request, Response, NextFunction } from 'express';

function isAuth (req: Request, res: Response, next: NextFunction) {
    if (!req.session.uid) {
        return res.status(401).json({ msg: 'Usuário não está logado.' });
    }else{
        next();
    }
}

export default isAuth;