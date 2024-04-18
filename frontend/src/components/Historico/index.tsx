import { useState } from 'react';
import historico from '../../assets/images/historico.svg';
import eye from '../../assets/images/eye.svg';
import trash from '../../assets/images/trash.svg';
import { Container, TableContent } from './styles';
import { DeletOrViewModal } from '../DeleteModal';
import { orders } from '../../mocks/orders';
import { Order } from '../../types/Order';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Historico = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalType, setModalType] = useState<'View' | 'Delete'>('View');

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

  function returnCategoryName(id: number | string) {
    if (id === 1) {
      return '🍕 Pizza';
    }
    if (id === 2) {
      return '🍔 Hambúrguer';
    }
    if (id === 3) {
      return '🥤 Bebidas';
    }
  }

  return (
    <>
      {isOpenModal && (
        <DeletOrViewModal
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
        <table>
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Data</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              item.products.map((product, idx) => (
                <tr key={`${index}-${idx}`}>
                  <td>{item.table_number}</td>
                  <td>{item.date}</td>
                  <td>{product.name}</td>
                  <td>{returnCategoryName(product.category_id)}</td>
                  <td>{product.price}</td>
                  <td>
                    <button type="button" onClick={() => handleEdit(item)} className='edit'>
                      <img src={eye} alt="Editar" />
                    </button>
                    <button type="button" onClick={() => {
                      handleDelete(item);
                    }} className='delete'>
                      <img src={trash} alt="Excluir" />
                    </button>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </TableContent>
    </>
  );
};
