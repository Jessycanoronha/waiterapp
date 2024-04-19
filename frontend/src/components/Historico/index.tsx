import { useEffect, useState } from 'react';
import historico from '../../assets/images/historico.svg';
import eye from '../../assets/images/eye.svg';
import trash from '../../assets/images/trash.svg';
import { Container, TableContent } from './styles';
import { DeleteOrViewModal } from '../DeleteModal';
import { Order } from '../../types/Order';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { returnCategoryName } from '../../utils/returnCategoryName';
import { api } from '../../utils/api';
import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Category } from '../../types/Category';

export const Historico = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalType, setModalType] = useState<'View' | 'Delete'>('View');
  const [orders, setOrdersList] = useState<{ [key: string]: Order[] }>({});
  const [category, setCategory] = useState<Category | null>(null);
  useEffect(() => {
    api.get('/orders').then(({ data }) => {
      // Agrupar os pedidos por table_number
      const groupedOrders: { [key: string]: Order[] } = {};
      data.forEach((order: Order) => {
        if (!groupedOrders[order.table_number]) {
          groupedOrders[order.table_number] = [order];
        } else {
          groupedOrders[order.table_number].push(order);
        }
      });
      setOrdersList(groupedOrders);
    });
  }, []);

  const handleEdit = (order: Order) => {
    setModalType('View');
    setSelectedOrder(order);
    setIsOpenModal(true);
  };

  const handleDelete = (order: Order) => {
    setModalType('Delete');
    setIsOpenModal(true);
    setSelectedOrder(order);
  };

  const handleClose = (deleteConfirmed: boolean) => {
    setIsOpenModal(false);
    setSelectedOrder(null);
    if (deleteConfirmed) {
      notify();
    }
  };

  const notify = () => {
    toast.error('Registro excluído com sucesso!', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };
  const formatTotal = (order: Order) => {
    return order.products.reduce((acc, { price, quantity }) => {
      return acc += (price * quantity!);
    }, 0);
  };

  return (
    <>
      {isOpenModal && (
        <DeleteOrViewModal
          visible={isOpenModal}
          onClose={() => { setIsOpenModal(false); setSelectedOrder(null); }}
          order={selectedOrder}
          modalType={modalType}
          handleClose={handleClose}
        />
      )}
      <ToastContainer />
      <Container>
        <img src={historico} alt="Histórico" />
        <h1>Histórico</h1>
        <span>Visualize pedidos anteriores</span>
      </Container>

      <TableContent>
        <h3>Pedidos <div>
          {Object.keys(orders).length}
        </div>
        </h3>

        <table>
          <thead>
            <tr>
              <th>Mesa</th>
              {/* <th>Data</th> */}
              <th>Itens do Pedido</th>
              <th>Total do Pedido</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(orders).map((tableNumber) => (
              orders[tableNumber].map((order, index) => (
                <React.Fragment key={`${tableNumber}-${index}`}>
                  <tr>
                    <td >{'Mesa ' + order.table_number}</td>
                    {/* <td >{order.date}</td> */}
                    <td >
                      {order.products.map((product, idx) => (
                        <div key={`${tableNumber}-${index}-${idx}`}>
                          {product.name} - {returnCategoryName(product.category_id)}
                        </div>
                      ))}
                    </td>
                    <td >{formatCurrency(formatTotal(order))}</td>
                    <td >
                      <button type="button" onClick={() => handleEdit(order)} className='edit'>
                        <img src={eye} alt="Editar" />
                      </button>
                      <button type="button" onClick={() => handleDelete(order)} className='delete'>
                        <img src={trash} alt="Excluir" />
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ))}
          </tbody>
        </table>
      </TableContent>
    </>
  );
};
