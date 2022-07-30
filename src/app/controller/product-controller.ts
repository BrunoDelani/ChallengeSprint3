import { Request, Response } from 'express';
import Product from '../schema/product-schema';
import Employee from '../schema/employee-schema';
const { ObjectId } = require('mongodb');

class ProductController {
  public async findProducts (req: Request, res: Response): Promise<Response> {
    try {
      let page: number = 1;
      let limit: number = 5;

      if (req.query.page) {
        page = parseInt(req.query.page.toString());
      }
      if (req.query.limit) {
        limit = parseInt(req.query.limit.toString());
      }

      const skip: number = limit * (page - 1);

      const products = await Product.find(req.body).skip(skip).limit(limit).sort('-createdOn');
      const totalCount: number = await Product.countDocuments(req.body);
      const totalPages: number = Math.round(totalCount / limit);
      if (totalCount === 0) {
        return res.status(404).json({
          message: 'Bad Request',
          details: [
            {
              message: 'Products not found, empty page.'
            }
          ]
        });
      }
      return res.status(200).json({
        products,
        currentPage: page,
        pageSize: products.length,
        totalCount,
        totalPages
      }
      );
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async createProduct (req: Request, res: Response): Promise<Response> {
    try {
      const id = ObjectId(req.body.employee_id);
      const employee = await Employee.findById(id);
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
