import React, { useState, useEffect } from 'react';
import closeIcon from '../../../assets/images/close-icon.svg';
import { Button } from '@material-ui/core';
import { Category } from '../../../types/Category';
import { Overlay, ModalBody, Actions } from './styles';

export interface EditCategoryModalProps {
  visible: boolean;
  category: Category | null;
  onClose: () => void;
  handleSave: (updatedCategory: Category) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ category, onClose, handleSave }) => {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setEmoji(category.icon);
    }
  }, [category]);

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
  useEffect(() => {
    setIsSaveEnabled(name !== '' && emoji !== '');
  }, [name, emoji]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmojiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmoji(event.target.value);
  };

  const handleSaveChanges = () => {
    if (category) {
      const updatedCategory: Category = {
        ...category,
        name: name,
        icon: emoji,
      };
      handleSave(updatedCategory);
      onClose();
    }
  };

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>
            Editar Categoria
          </strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>

        <div className="status-container">
          <span>
            Nome da Categoria
            <input type="text" value={name} onChange={handleNameChange} />
          </span>
          <span>
            Emoji
            <input type="text" value={emoji} onChange={handleEmojiChange} />
          </span>

        </div>
        <Actions>
          <Button type="button" className='secondary' onClick={handleSaveChanges} disabled={!isSaveEnabled}>
            <span>Salvar Alterações</span>
          </Button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
};

export default EditCategoryModal;
