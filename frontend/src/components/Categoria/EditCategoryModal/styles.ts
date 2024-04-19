import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  width: 480px;
  margin: 80px auto;

   .status-container {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    input {
      width: 408px;
      height: 56px;
      padding: 0px 16px 0px 16px;
      gap: 25px;
      border-radius: 8px;
      border: ;
      opacity: 0.5;
      display: flex;
      border: 1px solid gray;
    }
  }

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 24px;
    }

    small {
      font-size: 14px;
      opacity: 0.8;
    }

    .status {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
    line-height: 0;
  }
`;


export const CategoryDetails = styled.div`
  margin-top: 32px;
  .total {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;

    span {
      font-weight: 500;
      font-size: 14px;
      opacity: 0.8;
    }
  }

  > strong {
    font-weight: 500;
    font-size: 14px;
    opacity: 0.8;
  }

`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .primary {
    background: #D73035;
    border-radius: 48px;
    height: 48px;
    border: 0;
    color: #fff;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .secondary {
    padding: 14px 24px;
    color: #333;
    font-weight: bold;
    border: 0;
    background: transparent;
    margin-top: 12px;
  }
`;
