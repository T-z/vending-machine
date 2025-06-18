import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { Product } from '../models';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a product by ID', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Chocolate Bar',
      price: 2.50,
      inventory: 24
    };

    service.getProduct('1').subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('/api/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });


  it('should delete a product', () => {
    service.deleteProduct('1').subscribe();

    const req = httpMock.expectOne('/api/products/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get all products', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Chocolate Bar',
        price: 2.50,
        inventory: 24
      },
      {
        id: '2',
        name: 'Energy Drink',
        price: 3.75,
        inventory: 18
      }
    ];

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should create a new product', () => {
    const newProduct: Product = {
      name: 'Water Bottle',
      price: 1.50,
      inventory: 30
    };

    const mockResponse: Product = {
      id: '3',
      ...newProduct
    };

    service.addProduct(newProduct).subscribe(product => {
      expect(product).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(mockResponse);
  });
});
