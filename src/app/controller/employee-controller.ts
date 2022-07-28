import { Request, Response } from 'express';
import Employee from '../schema/employee-schema';

class EmployeeController {
  public async findEmployee (req: Request, res: Response): Promise<Response> {
    try {
      const result = await Employee.find();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new EmployeeController();
