import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #d4edda;
`;

const Message = styled.h1`
  color: #155724;
  background: #c3e6cb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Success = () => {
  return (
    <Container>
      <Message>Başarıyla giriş yaptınız!</Message>
    </Container>
  );
};

export default Success;
