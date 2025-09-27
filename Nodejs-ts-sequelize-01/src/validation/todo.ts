import { body } from 'express-validator/';


class TodoValidator {
    validateCreateTodo() {
        return [
            body('title').notEmpty().withMessage('title is required'),
            body('title').isLength({ min: 2, max: 255 }).withMessage('title length must be between 2 and 255'),
            body('completed').isBoolean().withMessage('completed must be true or false')
        ]
    }
}

export default new TodoValidator();