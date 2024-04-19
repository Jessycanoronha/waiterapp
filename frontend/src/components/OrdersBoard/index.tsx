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
  onCancelOrder: (orderId: number | string) => void;
  onChangeOrderStatus: (orderId: number | string, status: Order['status']) => void;
};

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (startProduction: boolean) => {
    if (!selectedOrder) return;
    setIsOpenModal(false);
    setIsLoading(true);
    try {
      if (startProduction && selectedOrder) {
        setTimeout(() => {
          notify('success', `O pedido ${selectedOrder.id} da mesa ${selectedOrder.table_number} foi iniciado com sucesso!`);
        }, 4);
      }
    } catch (error) {
      console.error('Erro ao iniciar o pedido:', error);
    }
    setIsLoading(false);
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;
    setIsOpenModal(false);
    setIsLoading(true);
    try {
      await api.delete(`/orders/${selectedOrder.id}`);
      onCancelOrder(selectedOrder.id);
      setTimeout(() => {
        notify('success', 'Pedido cancelado com sucesso!');
      }, 3);
    } catch (error) {
      console.error('Erro ao deletar o pedido:', error);
    }
    setIsLoading(false);
  };

  const handleChangeOrderStatus = async () => {
    if (!selectedOrder) return;
    setIsOpenModal(false);
    setIsLoading(true);
    try {
      const status = selectedOrder.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';
      await api.patch(`/orders/${selectedOrder.id}/status`, {
        status: status
      });
      onChangeOrderStatus(selectedOrder.id, status);
      if (selectedOrder.status === 'WAITING') {
        setTimeout(() => {
          notify('success', 'O pedido está em produção 👨🏿‍🍳 🍽️ !');
        }, 4);
      } else {
        setTimeout(() => {
          notify('success', 'O pedido foi finalizado com sucesso!');
        }, 4);
      }
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error);
    }
    setIsLoading(false);
  };

  const notify = (type: 'success' | 'error', message: string) => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
      toastId: type,
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
            onChangeOrderStatus={handleChangeOrderStatus}
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
