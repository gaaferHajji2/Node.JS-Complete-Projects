import { body, query } from 'express-validator/';


class TodoValidator {
    validateCreateTodo() {
        return [
            body('title').notEmpty().withMessage('title is required'),
            body('title').isLength({ min: 2, max: 255 }).withMessage('title length must be between 2 and 255'),
            body('completed').optional().isBoolean().withMessage('completed must be true or false')
        ]
    }

    validatePaginationQuery() {
        return [
            query('limit').optional().isInt({ min: 1, max: 100}).withMessage('limit must be number and between 1 && 100'),
            query('page').optional().isInt({ min: 1, max: 100}).withMessage('page must be number and between 1 && 100')
        ]
    }
}

export default new TodoValidator();