import historico from '../../assets/images/historico.svg';
import edit from '../../assets/images/edit.svg';
import trash from '../../assets/images/trash.svg';
import { Container, TableContent } from './styles';

export const Historico = () => {
  const dados = [
    {
      mesa: 1,
      data: '2023-04-01',
      nome: 'João da Silva',
      categoria: 'Prato Principal',
      total: 'R$ 19,90'
    },
    {
      mesa: 1,
      data: '2023-04-01',
      nome: 'João da Silva',
      categoria: 'Prato Principal',
      total: 'R$ 19,90'
    },
    {
      mesa: 1,
      data: '2023-04-01',
      nome: 'João da Silva',
      categoria: 'Prato Principal',
      total: 'R$ 19,90'
    }
  ];

  const handleEdit = (index: number) => {
    console.log('Editar', index);
  };

  const handleDelete = (index: number) => {
    console.log('Excluir', index);
  };
  return (
    <>
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
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((item, index) => (
              <tr key={index}>
                <td>{item.mesa}</td>
                <td>{item.data}</td>
                <td>{item.nome}</td>
                <td>{item.categoria}</td>
                <td>{item.total}</td>
                <td>
                  <img src={edit} alt="" onClick={() => handleEdit(index)} />
                  <img src={trash} alt="" onClick={() => handleDelete(index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContent></>
  );
};
