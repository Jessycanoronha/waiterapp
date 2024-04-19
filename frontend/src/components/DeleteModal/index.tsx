import { useEffect } from 'react';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { Overlay, ModalBody, OrderDetails, Actions } from '../OrderModal/styles';
import 'react-toastify/dist/ReactToastify.css';

export interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  modalType: 'View' | 'Delete';
  handleClose: (deleteConfirmed: boolean) => void
}

export function DeletOrViewModal({ visible, order, onClose, modalType, handleClose }: OrderModalProps) {

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  if (!visible || !order) return null;

  const total = order.products.reduce((acc, { price, quantity }) => {
    return acc += (price * quantity!);
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>{'Mesa ' + order.table_number}</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>
        <OrderDetails>
          <strong>Itens</strong>
          <div className="order-items">
            {order.products.map(({ id, name, imagepath, quantity, price }) => (
              <div key={id} className="item">
                <img src={`http://localhost:3000/file/${imagepath}`} alt={name} width={56} height={28.71} />
                <span className="quantity">{quantity}x</span>
                <div className="product-details">
                  <strong>{name}</strong>
                  <span>{formatCurrency(price)} </span>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>
        {
          modalType === 'Delete' &&
          <Actions>
            <button
              type="button"
              className="secondary"
              onClick={() => handleClose(true)}
            >
              <span>Excluir registro</span>
            </button>
          </Actions>
        }
      </ModalBody>
    </Overlay >
  );
}
