import { Response } from 'express';

export default (code: number, errorMessage: string, res: Response): Response => {
  return res.status(code).json({
    message: 'Bad Request',
    details: [
      {
        message: errorMessage
      }
    ]
  });
};
