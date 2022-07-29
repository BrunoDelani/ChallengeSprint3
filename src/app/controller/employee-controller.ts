import { Request, Response } from 'express';
import Employee from '../schema/employee-schema';
const { ObjectId } = require('mongodb');

class EmployeeController {
  public async findEmployee (req: Request, res: Response): Promise<Response> {
    try {
      const result = await Employee.find(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async createEmployee (req: Request, res: Response): Promise<Response> {
    try {
      const result = await Employee.findOne({ cpf: req.body.cpf });
      if (result) {
        return res.status(400).json({
          message: 'Bad Request',
          details: [
            {
              message: 'CPF is already in use.'
            }
          ]
        });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
    try {
      const result = await Employee.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async updateEmployee (req: Request, res: Response) {
    try {
      const id = ObjectId(req.params.employee_id);
      const result = await Employee.findByIdAndUpdate(id, req.body);
      if (result) {
        const employee = await Employee.findById(req.params.employee_id);
        return res.status(200).json({ message: 'Updated successfully.', employee });
      } else {
        return res.status(404).json({
          message: 'Bad Request',
          details: [
            {
              message: 'Employee not found.'
            }
          ]
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: 'Bad Request',
        details: [
          {
            message: 'Id invalid.'
          }
        ]
      });
    }
  }

  public async deleteEmployee (req: Request, res: Response) {
    try {
      const id = ObjectId(req.params.employee_id);
      const result = await Employee.findByIdAndDelete(id);
      if (!result === null) {
        return res.status(204).send();
      } else {
        return res.status(404).json({
          message: 'Bad Request',
          details: [
            {
              message: 'Employee not found.'
            }
          ]
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: 'Bad Request',
        details: [
          {
            message: 'Id invalid.'
          }
        ]
      });
    }
  }
}

export default new EmployeeController();
