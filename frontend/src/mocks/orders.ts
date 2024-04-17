import { Order } from '../types/Order';

export const orders: Order[] = [
  {
    'id': 1,
    'order_id': '6372d5dcf9ebdda354700c95',
    'products': [
      {
        'category_id': 1,
        'description': 'Pizza com molho de tomate, muçarela e manjericão',
        'id': 1,
        'name': 'Margherita',
        'price': 10.99,
        'quantity': 2,
        'imagepath': 'marguerita.png'
      },
      {
        'category_id': 3,
        'description': 'Hambúrguer com queijo, alface, tomate e maionese',
        'id': 3,
        'name': 'Cheeseburger',
        'price': 8.99,
        'quantity': 1,
        'imagepath': 'quatro-queijos.png'

      }
    ],
    'status': 'WAITING',
    'table_number': 'Table 1'
  },
  {
    'id': 2,
    'order_id': '6372d5dcf9ebdda354700c96',
    'products': [
      {
        'category_id': 2,
        'description': 'Suco de laranja natural',
        'id': 2,
        'name': 'Suco de laranja',
        'price': 2.5,
        'quantity': 1,
        'imagepath': 'suco-de-laranja.png'
      }
    ],
    'status': 'IN_PRODUCTION',
    'table_number': 'Table 2'
  }
];
