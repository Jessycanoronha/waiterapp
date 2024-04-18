import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: start;
  margin-left: 3%;

   span {
    color: #999;
    font-size: 16px;
    margin-top: 10px;
 }
  h1 {
    color: #000;
  }

`;

export const TableContent = styled.div`
  width: 100%;
  max-width: 1216px;
  margin: 40px auto;


  table {
    width: 100%;
    border-spacing: 0 8px;
    border: 1px solid rgba(204, 204, 204, 0.7 );
    border-radius: 10px;


    th {
      color: #000;
      font-weight: 600;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
      background: rgba(204, 204, 204, 0.2);
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: 400;
      color: #000;

      .edit, .delete {
        background: none;
        background-color: transparent;
        border: none; /* Remover borda */
        padding: 0; /* Remover padding */
        cursor: pointer;
        outline: none;
        margin-right: 8px;

        &:hover {
          opacity: 0.8;
        }

      }

    }
`;
