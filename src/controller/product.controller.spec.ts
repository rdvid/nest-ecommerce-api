import { Test } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from 'src/product/product.service';

describe('Controller', async () => {
    let productController: ProductController;
    let productService: ProductService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: {
                        createProduct : jest.fn(),
                        listProducts: jest.fn(),
                        editProduct: jest.fn(),
                        deleteProduct: jest.fn()
                    }
                },
            ],
        }).compile();

        productService = module.get<ProductService>(ProductService);
        productController = module.get<ProductController>(ProductController);
    });


    
    it('should be defined', async () => {
        expect(productService).toBeDefined();
        expect(productController).toBeDefined();
    });

    // describe('findAll', () => {
    //     it('should return an array of users', async () => {
    //         const result = ['test'];
    //         jest.spyOn(productService, 'findAll').mockImplementation(() => result);
            
    //         expect(await productController.findAll()).toBe(result);
    //     });
    // });    

});

