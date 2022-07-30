import { Router } from 'express';

import EmployeeController from '../app/controller/employee-controller';
import productController from '../app/controller/product-controller';
import createEmployeeValidation from '../app/validation/employee/create-employee-validation';
import updateEmployeeValidation from '../app/validation/employee/update-employee-validation';
import createProductValidation from '../app/validation/product/create-product-validation';

const routes = Router();
const version: String = '/api/v1/';

routes.get(`${version}employee*`, EmployeeController.findEmployee);
routes.post(`${version}employee`, createEmployeeValidation, EmployeeController.createEmployee);
routes.put(`${version}employee/:employee_id`, updateEmployeeValidation, EmployeeController.updateEmployee);
routes.delete(`${version}employee/:employee_id`, EmployeeController.deleteEmployee);

routes.post(`${version}product`, createProductValidation, productController.createProduct);

export default routes;
