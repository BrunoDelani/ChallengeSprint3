import { Request, Response } from 'express';
import Product from '../schema/product-schema';
import Employee from '../schema/employee-schema';
const { ObjectId } = require('mongodb');

class ProductController {
  public async createProduct (req: Request, res: Response): Promise<Response> {
    try {
      const id = ObjectId(req.body.employee_id);
      const employee = await Employee.findById(id);
      console.log(employee);
      if (employee) {
        if (employee.situation === 'active' && employee.office === 'gerente') {
          const product = await Product.create(req.body);
          return res.status(201).json(product);
        } else {
          return res.status(401).json({
            message: 'Bad Request',
            details: [
              {
                message: 'Employee unauthorized.'
              }
            ]
          });
        }
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
            message: 'Employee id invalid.'
          }
        ]
      });
    }
  }
}

export default new ProductController();
