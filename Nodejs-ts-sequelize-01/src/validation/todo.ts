import { body, param, query } from 'express-validator/';

class TodoValidator {
    validateTodoReq() {
        return [
            body('title').notEmpty().withMessage('title is required'),
            body('title').isLength({ min: 2, max: 255 }).withMessage('title length must be between 2 and 255'),
            body('completed').optional().isBoolean().withMessage('completed must be true or false')
        ]
    }

    validatePaginationQuery() {
        return [
            query('limit').optional().isInt({ min: 1, max: 100}).withMessage('limit must be number and between 1 && 100'),
            query('page').optional().isInt({ min: 1 }).withMessage('page must be number and between 1 && 100')
        ]
    }

    validateIdParam() {
        return [
            param('id').notEmpty().withMessage('id is Required').isUUID(4).withMessage('id must be valid UUIDV4'),
        ]
    }
}

export default new TodoValidator();