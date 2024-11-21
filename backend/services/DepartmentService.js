import Department from '../models/Departments.js'

const DepartmentService = {
    async getAllDepartments() {
        try {
            const departments = await Department.findAll();
            return departments 
        } catch (error) {
            throw new Error("Error al obtener los departamentos")
        }
    },

    async getDepartmentId(departmentId) {
        try {
            const department = await Department.findByPk(departmentId)
            if (!department) {
                throw new Error("El departamento no existe")
            }
            return department
        } catch (error) {
            throw new Error("Error al obtener el departamento")
        }
    },

    async createDepartment(departmentData) {
        try {
            return await Department.create(departmentData)
        } catch (error) {
            throw new Error("Error al crear el departamento")
        }
    },

    async updateDepartment(departmentId, updatedData) {
        try {
            const department = await this.getDepartmentId(departmentId)
            
            if(!department) {
                throw new Error("El departamento no existe")
            }

            return await department.update(updatedData)
        } catch (error) {
            throw new Error("Error al actualizar el departamento")
        }
    },

    async deleteDepartment(departmentId) {
        try {
            const department = await this.getDepartmentId(departmentId)
            
            if(!department) {
                throw new Error("El departamento no existe")
            }
            
            await department.destroy()
            return department
        } catch (error) {
            throw new Error("Error al eliminar el departamento")
        }
    }
}

export default DepartmentService