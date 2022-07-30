import { Request, Response } from 'express';
import Product from '../schema/product-schema';
import Employee from '../schema/employee-schema';
import errorResponse from '../utils/errorResponse';
const { ObjectId } = require('mongodb');

class ProductController {
  public async findProducts (req: Request, res: Response): Promise<Response> {
    try {
      let validacaoEmployeeId: boolean = true;
      if (req.body.employee_id) {
        const objectId = ObjectId(req.body.employee_id);
        const employee = await Employee.findById(objectId);
        if (!employee) {
          validacaoEmployeeId = false;
        }
      }
      if (validacaoEmployeeId) {
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
          return errorResponse(404, 'Products not found, empty page.', res);
        }

        return res.status(200).json({
          products,
          currentPage: page,
          pageSize: products.length,
          totalCount,
          totalPages
        }
        );
      } else {
        return errorResponse(404, 'Employee not found.', res);
      }
    } catch (error) {
      return errorResponse(400, 'Employee id invalid.', res);
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
          return errorResponse(401, 'Employee unauthorized.', res);
        }
      } else {
        return errorResponse(404, 'Employee not found.', res);
      }
    } catch (error) {
      return errorResponse(400, 'Employee id invalid.', res);
    }
  }
}

export default new ProductController();
