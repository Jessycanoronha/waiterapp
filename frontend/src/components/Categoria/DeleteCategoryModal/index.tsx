import { useEffect } from 'react';
import closeIcon from '../../../assets/images/close-icon.svg';
import 'react-toastify/dist/ReactToastify.css';
import { Overlay, ModalBody, Actions, CategoryDetails } from './styles';
import { Category } from '../../../types/Category';

export interface CategoryModalProps {
  visible: boolean;
  category: Category | null;
  onClose: () => void;
  modalType: 'View' | 'Delete';
  handleDelete: () => void
}

export function DeleteCategoryModal({ visible, category, onClose, handleDelete }: CategoryModalProps) {

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

  if (!visible || !category) return null;

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Excluir categoria - {category.name}</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>
        <CategoryDetails>
          <span>Tem certeza que deseja excluir essa categoria?</span>
          <div className='total'>
            <strong>{category.icon}</strong>
            <strong>{category.name}</strong>
          </div>
        </CategoryDetails>

        <Actions>
          <button
            type="button"
            className="primary"
            onClick={() => handleDelete()}
          >
            <span>Excluir categoria</span>
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => onClose()}
          >
            <span>Manter categoria</span>
          </button>
        </Actions>
      </ModalBody>
    </Overlay >
  );
}
