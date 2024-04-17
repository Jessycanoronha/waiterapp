import { useState } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

type OrdersBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
}
export function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenOrderDetails(order: Order) {
    setIsOpenModal(true);
    setSelectedOrder(order);
  }

  return (
    <Board>
      {isOpenModal &&
        <OrderModal visible={isOpenModal} order={selectedOrder} onClose={() => setIsOpenModal(false)} />
      }
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders?.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button type="button" key={order.id} onClick={() => handleOpenOrderDetails(order)}>
              <strong>{order.table_number}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}

    </Board>
  );
}
