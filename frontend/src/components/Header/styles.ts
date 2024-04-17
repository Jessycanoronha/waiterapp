import styled from 'styled-components'


export const Container = styled.header`
  display: flex;
  background: #D73035;
  justify-content: center;
  height: 198px;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    h1 {
      font-size: 32px;
      line-height: 56px;
      color: #ffffff;
    }

    h2 {
      font-size: 16px;
      font-weight: 400;
      opacity: 0.9;
      color: #ffffff;
      margin-top: 6px;
    }
`
