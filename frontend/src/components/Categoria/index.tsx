
import { useEffect, useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Category } from '../../types/Category';
import { api } from '../../utils/api';
import edit from '../../assets/images/edit.svg';
import trash from '../../assets/images/trash.svg';
import { Container } from '@material-ui/core';
import { TableContent } from '../Historico/styles';
import { DeleteCategoryModal } from './DeleteCategoryModal';
import EditCategoryModal from './EditCategoryModal';


export const CategoryComponent = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [modalType, setModalType] = useState<'Edit' | 'Delete'>('Edit');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    api.get('/categories').then(({ data }) => {
      setCategories(data);
    });
  }, []);

  const handleView = (category: Category) => {
    setModalType('Edit');
    setSelectedCategory(category);
    setIsOpenModal(true);
  };

  const handleDelete = (category: Category) => {
    setModalType('Delete');
    setSelectedCategory(category);
    setIsOpenModal(true);
  };

  const handleClose = (deleteConfirmed: boolean) => {
    setIsOpenModal(false);
    setSelectedCategory(null);
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
  function onDeleteCategory(categoryId: string | number) {
    setCategories((prevState) => prevState.filter((category) =>
      category.id !== categoryId));
  }

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    setIsOpenModal(false);
    setIsLoading(true);
    try {
      await api.delete(`/categories/${selectedCategory.id}`);
      onDeleteCategory(selectedCategory.id);
      // setTimeout(() => {
      //   // notify('success', 'Categoria deletada com sucesso!');
      // }, 3);
    } catch (error) {
      console.error('Erro ao deletar o pedido:', error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isOpenModal && modalType == 'Delete' && (
        <DeleteCategoryModal
          visible={isOpenModal}
          onClose={() => handleClose(false)}
          category={selectedCategory}
          handleDelete={() => handleDeleteCategory()}
          modalType={modalType}
        />
      )}
      {isOpenModal && modalType == 'Edit' &&
        <EditCategoryModal
          visible={false}
          category={selectedCategory}
          onClose={() => handleClose(false)}
          handleSave={() => { }}
        />
      }
      <ToastContainer />
      <Container>
        <h1>Categorias</h1>
        <span>Gerencie suas categorias</span>
      </Container>

      <TableContent>
        <h3>Categorias
          <div>{Object.keys(categories).length}
          </div>
        </h3>

        <table>
          <thead>
            <tr>
              <th>Emoji</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>
                  {category.icon}
                </td>
                <td>{category.name}</td>
                <td>
                  <button type="button" onClick={() => handleView(category)} className='edit'>
                    <img src={edit} alt="Visualizar" />
                  </button>
                  <button type="button" onClick={() => handleDelete(category)} className='delete'>
                    <img src={trash} alt="Excluir" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContent>
    </>
  );
};
