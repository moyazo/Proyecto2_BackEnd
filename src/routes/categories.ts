import { Router, Request, Response } from 'express'
const router = Router()
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controllers/categories'

// Get all categories
router.get('/', async ( req, res, next ) => {
    try {
        const categories = await getCategories();
        if(!categories.data) {
            res.status(403).json('Can not get categories')
        }

        res.status(200).json(categories)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Get user by id
router.get('/:id', async ( req, res, next ) => {
    try {
        const category = await getCategoryById(req.params.id);
        if(!category.data) {
            res.status(403).json('Category not found')
        }

        res.status(200).json(category)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Create a new category
router.post('/', async ( req, res, next ) => {
    try {
        if(!req.body) {
            return res.status(403).json('Request body is missing')
        }
        const category = await createCategory(req.body);
        if(!category.data) {
            return res.status(403).json('Can not get Category')
        }
        res.status(200).json(category)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Update a category by id
router.put('/:id', async ( req, res, next ) => {
    try {
        if(!req.body) {
            return res.status(403).json('Request body is missing')
        }
        const category = await updateCategory(req.params.id, req.body);
        if(!category.data) {
            return res.status(403).json('Can not update category')
        }
        res.status(200).json(category)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Delete a category by id
router.delete('/:id', async ( req, res, next ) => {
    try {
        if(!req.params.id) {
            return res.status(403).json('Category id is missing')
        }
        const category = await deleteCategory(req.params.id);
        if(!category.data) {
            return res.status(403).json('Can not delete category')
        }
        res.status(200).json(category)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

export default router