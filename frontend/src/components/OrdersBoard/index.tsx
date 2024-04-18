import { useState } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Board, OrdersContainer } from './styles';
import { api } from '../../utils/api';

type OrdersBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void
}

export function OrdersBoard({ icon, title, orders, onCancelOrder }: OrdersBoardProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (startProduction: boolean) => {
    setIsOpenModal(false);
    setSelectedOrder(null);
    if (startProduction) {
      notify();
    }
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;
    setIsOpenModal(false);
    setIsLoading(true);
    try {
      await api.delete(`/orders/${selectedOrder.order_id}`);
      console.log(typeof selectedOrder.order_id);
      onCancelOrder(selectedOrder!.order_id);
      notifyCancel();
    } catch (error) {
      console.error('Erro ao deletar o pedido:', error);

      // toast.error('Erro ao deletar o pedido. Por favor, tente novamente mais tarde.', {
      //   position: 'top-right',
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   progress: undefined,
      //   theme: 'light',
      //   transition: Bounce,
      // });
    }
    setIsLoading(false);
  };

  const notify = () => {
    toast.success('Pedido iniciado com sucesso!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
      toastId: 'success',
    });
  };

  const notifyCancel = () => {
    toast.error('Pedido cancelado!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
      toastId: 'error',
    });
  };

  const handleOpenOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOpenModal(true);
  };

  return (
    <>
      <ToastContainer />
      <Board>
        {isOpenModal && (
          <OrderModal
            visible={isOpenModal}
            order={selectedOrder}
            onClose={() => setIsOpenModal(false)}
            handleClose={handleClose}
            handleCancel={handleCancelOrder}
            isLoading={isLoading}
          />
        )}

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
    </>
  );
}
