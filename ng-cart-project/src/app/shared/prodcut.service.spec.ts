import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProdcutService } from './product.service';

describe('ProdcutService', () => {
  let service: ProdcutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProdcutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addcart to items', () => {
    const product = [
      {
        _id: '453543',
        title: 'product 12',
        price: 12345,
        description: 'descipriton',
        category: 'mens',
        image: 'string',
        rating: {
          rate: 1,
          count: 2,
        },
        quantity: 1,
      },
    ];
    service.addAllItemsToCart(product);
    expect(service.cartItems.length).toBe(1);
  });

  it('should add item cart ', () => {
    const item = {
      _id: '453543',
      title: 'product 12',
      price: 12345,
      description: 'descipriton',
      category: 'mens',
      image: 'string',
      rating: {
        rate: 1,
        count: 2,
      },
      quantity: 1,
    };
    const data = service.addCartItem(item);
    expect(data).toBeDefined();
  });
});
