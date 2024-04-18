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

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter((order) =>
      order.id !== orderId));
  }
  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');
  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={waiting} onCancelOrder={handleCancelOrder} />
      <OrdersBoard icon="🧑‍🍳" title="Em preparo" orders={inProduction} onCancelOrder={handleCancelOrder} />
      <OrdersBoard icon="✅" title="Pronto" orders={done} onCancelOrder={handleCancelOrder} />
    </Container>
  );
}
