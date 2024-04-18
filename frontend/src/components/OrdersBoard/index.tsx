import { useState, useEffect } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Board, OrdersContainer } from './styles';

type OrdersBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const [toastErrorDisplayed, setToastErrorDisplayed] = useState(false);

  const handleClose = (startProduction: boolean) => {
    setIsOpenModal(false);
    setSelectedOrder(null);
    if (startProduction && !toastDisplayed) {
      setToastDisplayed(true);
    }
  };

  useEffect(() => {
    if (toastDisplayed) {
      notify();
    }
    if (toastErrorDisplayed) {
      notifyCancel();
    }
  }, [toastDisplayed, toastErrorDisplayed]);

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

  function handleOpenOrderDetails(order: Order) {
    setToastDisplayed(false);
    setToastErrorDisplayed(false);
    setSelectedOrder(order);
    setIsOpenModal(true);
  }
  function handleCancelOrder(canceled: boolean) {
    setIsOpenModal(false);
    setSelectedOrder(null);
    if (!toastDisplayed && canceled) {
      setToastErrorDisplayed(true);
    }
  }

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
