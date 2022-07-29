import { Router } from 'express';

import EmployeeController from '../app/controller/employee-controller';
import createEmployeeValidation from '../app/validation/employee/create-employee-validation';
import updateEmployeeValidation from '../app/validation/employee/update-employee-validation';

const routes = Router();

routes.get('/api/v1/employee/', EmployeeController.findEmployee);
routes.post('/api/v1/employee/', createEmployeeValidation, EmployeeController.createEmployee);
routes.put('/api/v1/employee/:employee_id', updateEmployeeValidation, EmployeeController.updateEmployee);
routes.delete('/api/v1/employee/:employee_id', EmployeeController.deleteEmployee);

export default routes;
