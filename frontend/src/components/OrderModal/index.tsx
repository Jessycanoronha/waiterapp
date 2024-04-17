import { useEffect } from 'react';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import { formatCurrency } from '../../utils/formatCurrency';

export interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}
export function OrderModal({ visible, order, onClose }: OrderModalProps) {
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
          <strong>{order.table_number}</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>
        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span className='tag'>
              {order.status === 'WAITING' && '🕒'}
              {order.status === 'IN_PRODUCTION' && '👩‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>

            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>
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

        <Actions>
          <button
            type="button"
            className="primary"
            onClick={onClose}
          >
            <span>👨🏿‍🍳</span>
            <span>Iniciar produção</span>
          </button>
          <button
            type="button"
            className="secondary"
            onClick={onClose}
          >
            <span>Cancelar pedido</span>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
