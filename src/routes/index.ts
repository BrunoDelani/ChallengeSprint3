import { Router } from 'express';

import EmployeeController from '../app/controller/employee-controller';

const routes = Router();

routes.get('/api/v1/employee/', EmployeeController.findEmployee);

export default routes;
