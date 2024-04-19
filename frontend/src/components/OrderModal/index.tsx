import { useEffect } from 'react';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { returnCategoryName } from '../../utils/returnCategoryName';

export interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  handleClose: (startProduction: boolean) => void
  handleCancel: (cancelled: boolean) => Promise<void>;
  isLoading: boolean,
  onChangeOrderStatus: () => Promise<void>
}
export function OrderModal({ visible, order, onClose, handleCancel, isLoading, onChangeOrderStatus }: OrderModalProps) {
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
            {order.products.map((product) => (
              <div key={product.id} className="item">
                <img src={`http://localhost:3000/file/${product.imagepath}`} alt={product.name} width={56} height={28.71} />
                <span className="quantity">{product.quantity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <div>
                    {returnCategoryName(product.category_id)}
                  </div>
                  <span>{formatCurrency(product.price)} </span>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>
        {order.status !== 'DONE' && (
          <Actions>
            {order.status === 'WAITING' ? (
              <button
                type="button"
                className="primary"
                onClick={() => onChangeOrderStatus()}
                disabled={isLoading}
              >
                <span>👨🏿‍🍳</span>
                <span>Iniciar produção</span>
              </button>

            ) : (
              <button
                type="button"
                className="primary"
                onClick={() => onChangeOrderStatus()}
                disabled={isLoading}
              >
                <span>👨🏿‍🍳</span>
                <span>Concluir pedido</span>
              </button>
            )}

            <button
              type="button"
              className="secondary"
              onClick={() => handleCancel(true)}
              disabled={isLoading}
            >
              <span>Cancelar pedido</span>
            </button>
          </Actions>

        )}
      </ModalBody>
    </Overlay>
  );
}
