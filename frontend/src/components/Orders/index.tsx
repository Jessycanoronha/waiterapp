import { useState, useEffect } from 'react';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data));
  }, []);

  function handleCancelOrder(orderId: string | number) {
    setOrders((prevState) => prevState.filter((order) =>
      order.id !== orderId));
  }
  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleOrderStatusChange(orderId: string | number, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order.id === orderId ? { ...order, status }
        : order
    )));
  }
  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={waiting} onCancelOrder={handleCancelOrder} onChangeOrderStatus={handleOrderStatusChange} />
      <OrdersBoard icon="🧑‍🍳" title="Em preparo" orders={inProduction} onCancelOrder={handleCancelOrder} onChangeOrderStatus={handleOrderStatusChange} />
      <OrdersBoard icon="✅" title="Pronto" orders={done} onCancelOrder={handleCancelOrder} onChangeOrderStatus={handleOrderStatusChange} />
    </Container>
  );
}
