import { Request, Response } from 'express';
import Employee from '../schema/employee-schema';
import convertDate from '../utils/convertDate';

class EmployeeController {
  public async findEmployee (req: Request, res: Response): Promise<Response> {
    try {
      const result = await Employee.find();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async createEmployee (req: Request, res: Response): Promise<Response> {
    try {
      req.body.birthday = convertDate(req.body.birthday);
      const result = await Employee.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async updateEmployee (req: Request, res: Response): Promise<Response> {
    try {
      const result = await Employee.findByIdAndUpdate(req.params.employee_id, req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async deleteEmployee (req: Request, res: Response): Promise<Response> {
    try {
      await Employee.findByIdAndDelete(req.params.employee_id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new EmployeeController();
