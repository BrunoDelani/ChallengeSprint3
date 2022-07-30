import { Request, Response } from 'express';
import Product from '../schema/product-schema';

class ProductController {
  public async createProduct (req: Request, res: Response): Promise<Response> {
    try {
      const result = await Product.create(req.body);
      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
}

export default new ProductController();
