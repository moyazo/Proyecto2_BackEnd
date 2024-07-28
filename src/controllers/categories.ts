import db from '../models/index'
import {CategoryControllerReturn, CategoryControllerReturnArray, CategoryControllerReturnDeleted} from "../types/controllers";
import {CategoryType} from "../types/models";


const getCategories = async (): Promise<CategoryControllerReturnArray> => {
    const categoryToReturn = {
        id: '',
        name: '',
    }
    let controllerReturn: CategoryControllerReturnArray = {
        data: [categoryToReturn], message: "", status: false

    }
    const categories = await db.models.Category.findAll()

    if(!categories) {

        controllerReturn.message = 'No se encontraron usuarios'
    } else {
        const parseCategories: CategoryType[] = categories.map(category => category.dataValues)
        controllerReturn.status = true
        controllerReturn.data = parseCategories
        controllerReturn.message = 'Categorías encontradas'
    }

    return controllerReturn
}

const getCategoryById = async (categoryId: string): Promise<CategoryControllerReturn> => {
    const categoryToReturn = {
        id: '',
        name: '',
        email: '',
        password: '',
        userName: '',
        salt: '',
    }
    let controllerReturn: CategoryControllerReturn = {
        data: categoryToReturn, message: "", status: false

    }

    if(!categoryId) {
        controllerReturn.message = 'ID de categoría no válido'
    } else {
        const category = await db.models.Category.findByPk(categoryId)

        if(!category) {
            controllerReturn.message = 'No se encontró una cateogría con ese ID'
        } else {
            categoryToReturn.id = category.dataValues.id
            categoryToReturn.name = category.dataValues.name

            controllerReturn.status = true
            controllerReturn.data = categoryToReturn
            controllerReturn.message = 'Categoría encontrada'
        }
    }

    return controllerReturn
}

const createCategory = async (category: CategoryType): Promise<CategoryControllerReturn> => {
    const categoryToReturn = {
        id: '',
        name: '',
    }
    let controllerReturn: CategoryControllerReturn = {
        data: categoryToReturn, message: "", status: false

    }

    let dataNotundefined = false
    for (const key in category) {
        if(key != undefined || key != '') {
            break
        }
    }
    if(dataNotundefined) {
        controllerReturn.message = 'Todos los campos son obligatorios'
        return controllerReturn
    } else {
        const categoryExists = await db.models.Category.findOne({where: {name: category.name}})
        if(categoryExists) {
            controllerReturn.message = 'Ya existe una categoría con ese nombre'
        } else {

            const newCategory = await db.models.Category.create({name: category.name})

            if(!newCategory) {
                controllerReturn.message = 'No se pudo crear la categoría'
            } else{
                const category = await getCategoryById( newCategory.dataValues.id)
                categoryToReturn.id = category.data.id
                categoryToReturn.name = category.data.name

                controllerReturn.status = true
                controllerReturn.data = categoryToReturn
                controllerReturn.message = 'Categoría creada correctamente'
            }
        }
    }

    return controllerReturn
}

const updateCategory = async (categoryId: string, category: CategoryType): Promise<CategoryControllerReturn> => {
    const categoryToReturn = {
        id: '',
        name: '',
    }
    let controllerReturn: CategoryControllerReturn = {
        data: categoryToReturn, message: "", status: false

    }

    if(!categoryId) {
        controllerReturn.message = 'ID de categoría no válido'
    } else {
        const updatedCategory = await db.models.Category.update(category, {where: {id: categoryId}})

        if(updatedCategory[0] === 0) {
            controllerReturn.message = 'No se encontró una categoría con ese ID'
        } else {
            const category = await getCategoryById(categoryId)
            categoryToReturn.id = category.data.id
            categoryToReturn.name = category.data.name


            controllerReturn.status = true
            controllerReturn.data = categoryToReturn
            controllerReturn.message = 'Categoría actualizada correctamente'
        }
    }

    return controllerReturn
}

const deleteCategory = async (categoryId: string): Promise<CategoryControllerReturnDeleted> => {
    let controllerReturn: CategoryControllerReturnDeleted= {
        status: false,
        data: 0,
        message: ''
    }

    if(!categoryId) {
        controllerReturn.message = 'ID de categoría no válido'
    } else {
        const deletedCategory = await db.models.Category.destroy({where: {id: categoryId}})

        if(deletedCategory === 0) {
            controllerReturn.message = 'No se encontró una categoría con ese ID'
        } else {
            controllerReturn.status = true
            controllerReturn.data = 1
            controllerReturn.message = 'Usuario eliminado correctamente'
        }
    }

    return controllerReturn
}

export {getCategories, getCategoryById, createCategory, updateCategory, deleteCategory}