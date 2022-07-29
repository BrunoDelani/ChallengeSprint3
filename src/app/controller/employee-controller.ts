import { Request, Response } from 'express';
import Employee from '../schema/employee-schema';

class EmployeeController {
  public async findEmployee (req: Request, res: Response): Promise<Response> {
    try {
      const result = await Employee.find();
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
      if (result.cpf) {
        result.cpf = result.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
          function (regex, argumento1, argumento2, argumento3, argumento4) {
            return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
          });
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async updateEmployee (req: Request, res: Response) {
    try {
      const result = await Employee.findByIdAndUpdate(req.params.employee_id, req.body);
      if (result) {
        const employee = await Employee.findById(req.params.employee_id);
        if (employee && employee.cpf) {
          employee.cpf = employee.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
            function (regex, argumento1, argumento2, argumento3, argumento4) {
              return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
            });
        }
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
      return res.status(500).json({ error });
    }
  }

  public async deleteEmployee (req: Request, res: Response) {
    try {
      const result = await Employee.findByIdAndDelete(req.params.employee_id);
      if (result) {
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
      return res.status(500).json({ error });
    }
  }
}

export default new EmployeeController();
