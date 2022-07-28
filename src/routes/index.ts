import { Router } from 'express';

import EmployeeController from '../app/controller/employee-controller';

const routes = Router();

routes.get('/api/v1/employee/', EmployeeController.findEmployee);
routes.post('/api/v1/employee/', EmployeeController.createEmployee);

export default routes;
