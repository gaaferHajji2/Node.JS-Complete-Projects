import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/";

class CheckErrors{

    public checkAllErrors(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req)
        
            if(!errors.isEmpty()) {
              return res.json({ errors }).status(400)
            }
        
            next()
    }

}

export default new CheckErrors()