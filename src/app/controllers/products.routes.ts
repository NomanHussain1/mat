import { Router, Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Ok, NotFound, validationErrorFormatter, BadRequest, getQueryParamAsIntArray } from '../shared';
import {
  ProductsDataAccess,
  createProductValidator,
  CreateProductInput,
  updateProductValidator,
  UpdateProductInput
} from '../products';
import { HarvestDTO } from '../products/models/harvest.model';
import { UserdataDTO } from '../products/models/userdata.model';

/**
 * The Products-Module router that holds all module routes.
 */
export const productsRouter = Router();

/**
 * The relative route for the Products-Module.
 *
 * No leading or trailing slashes required.
 */
export const productsRelativeRoute = 'products';

/* Create new product route. */
// productsRouter.post('', createProductValidator, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     /** The validation errors that may result from validating request [body', 'cookies', 'headers', 'params' or 'query' ] */
//     const validationErrors = validationResult(req)
//       .formatWith(validationErrorFormatter)
//       .array({ onlyFirstError: true });

//     if (validationErrors.length) {
//       return BadRequest(res, { errors: validationErrors });
//     }

//     const data: CreateProductInput = req.body;
//     const result = await ProductsDataAccess.create(data);

//     if (result.error) {
//       next(result.error);
//     } else if (result.validationErrors && result.validationErrors.length) {
//       BadRequest(res, { errors: result.validationErrors });
//     } else if (result.data) { 
//       Ok(res, { data: result.data });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

/*-----post for user data for informnation-----------*/
productsRouter.post('/post1', async (req: Request, res: Response, next: NextFunction) => {
  try {
    /** The validation errors that may result from validating request [body', 'cookies', 'headers', 'params' or 'query' ] */
    

    const data: UserdataDTO = req.body;
    console.log(data);
    const result = await ProductsDataAccess.postProduct(data);

    const id: string=req.query.id;
    const title:string=req.body.title;
    
    
    
  

    // if (result.error) {
    //   next(result.error);
    // } else if (result.validationErrors && result.validationErrors.length) {
    //   BadRequest(res, { errors: result.validationErrors });
    // } else if (result.data) { 
    //   Ok(res, { data: result.data });
    // }

    Ok(res, { data: [] });

  } catch (error) {
    next(error);
  }
});

/* Search products route. */
productsRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>123</h1>");
  try {
    const result = await ProductsDataAccess.search(
      req.query.name,
      getQueryParamAsIntArray(req, 'categories'),
      parseInt(req.query.page),
      parseInt(req.query.pageSize)
    );
    if (result.error) {
      next(result.error);
    } else if (result.data) {
      Ok(res, { data: result.data, meta: { ...result.paginationInfo } });
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.get('/search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zipcode: string=req.query.zipcode;
    const nameproducts: string=req.query.nameproducts;
    console.log(zipcode);
    console.log(nameproducts);

    const result = await ProductsDataAccess.searchproducts(
      zipcode,
      nameproducts,
      1,
      100
    );
    
    if (result.error) {
      next(result.error);
    } else if (result.data) {
      Ok(res, { data: result.data, meta: { ...result.paginationInfo } });
    }

    // Ok(res, { data: '' });

  } catch (error) {
    next(error);
  }
});

/* Find product by id route. */
productsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProductsDataAccess.findById(Number.parseInt(req.params.id));

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.data) {
      Ok(res, { data: result.data });
    }
  } catch (error) {
    next(error);
  }
});

/* Update an existing product route. */
productsRouter.put('', updateProductValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    /** The validation errors that may result from validating request [body', 'cookies', 'headers', 'params' or 'query' ] */
    const validationErrors = validationResult(req)
      .formatWith(validationErrorFormatter)
      .array({ onlyFirstError: true });

    if (validationErrors.length) {
      return BadRequest(res, { errors: validationErrors });
    }

    const data: UpdateProductInput = req.body;
    const result = await ProductsDataAccess.update(data);

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.validationErrors && result.validationErrors.length) {
      BadRequest(res, { errors: result.validationErrors });
    } else if (result.data) {
      Ok(res, { data: result.data });
    }
  } catch (error) {
    next(error);
  }
});

/* Delete by id route. */
productsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProductsDataAccess.delete(Number.parseInt(req.params.id));

    if (result.error) {
      next(result.error);
    } else if (result.isNotFound) {
      NotFound(res);
    } else if (result.validationErrors && result.validationErrors.length) {
      BadRequest(res, { errors: result.validationErrors });
    } else if (result.data) {
      Ok(res, { data: result.data });
    }
  } catch (error) {
    next(error);
  }
});
