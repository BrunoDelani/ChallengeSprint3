import { Request, Response } from 'express';
import Employee from '../schema/employee-schema';
import errorResponse from '../utils/errorResponse';
const { ObjectId } = require('mongodb');

class EmployeeController {
  public async findEmployee (req: Request, res: Response): Promise<Response> {
    try {
      let page: number = 1;
      if (req.query.page) {
        page = parseInt(req.query.page.toString());
      }
      let limit: number = 5;
      if (req.query.limit) {
        limit = parseInt(req.query.limit.toString());
      }
      const skip: number = limit * (page - 1);
      const employees = await Employee.find(req.query).skip(skip).limit(limit).sort('-createdOn');
      const totalCount: number = await Employee.countDocuments(req.query);
      const totalPages: number = Math.round(totalCount / limit);
      if (totalCount === 0) {
        return errorResponse(404, 'Employees not found, empty page.', res);
      }
      return res.status(200).json({
        employees,
        currentPage: page,
        pageSize: employees.length,
        totalCount,
        totalPages
      }
      );
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async createEmployee (req: Request, res: Response): Promise<Response> {
    try {
      const result = await Employee.findOne({ cpf: req.body.cpf });
      if (result) {
        return errorResponse(400, 'CPF is already in use.', res);
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

  public async updateEmployee (req: Request, res: Response): Promise<Response> {
    try {
      const id = ObjectId(req.params.employee_id);
      const result = await Employee.findByIdAndUpdate(id, req.body);
      if (result) {
        const employee = await Employee.findById(req.params.employee_id);
        return res.status(200).json({ message: 'Updated successfully.', employee });
      } else {
        return errorResponse(404, 'Employee not found.', res);
      }
    } catch (error) {
      return errorResponse(400, 'Employee id invalid.', res);
    }
  }

  public async deleteEmployee (req: Request, res: Response): Promise<Response> {
    try {
      const id = ObjectId(req.params.employee_id);
      const result = await Employee.findByIdAndDelete(id);
      if (result) {
        return res.status(204).send();
      } else {
        return errorResponse(404, 'Employee not found.', res);
      }
    } catch (error) {
      return errorResponse(400, 'Employee id invalid.', res);
    }
  }
}

export default new EmployeeController();
