import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 4px 0;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 12px;
  background: ${({ disabled }) => (disabled ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Geçerli bir email giriniz.';
    if (!validatePassword(password)) newErrors.password = 'Şifre en az 8 karakter, bir büyük harf, bir rakam içermeli';
    if (!accepted) newErrors.accepted = 'Şartları kabul etmelisiniz';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      window.location.href = '/success';
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}

        <Input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Şifre" 
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}

        <CheckboxContainer>
          <input 
            type="checkbox" 
            checked={accepted} 
            onChange={(e) => setAccepted(e.target.checked)} 
          /> 
          <span>Şartları kabul ediyorum</span>
        </CheckboxContainer>
        {errors.accepted && <ErrorText>{errors.accepted}</ErrorText>}

        <Button type="submit" disabled={Object.keys(errors).length > 0}>Giriş Yap</Button>
      </LoginForm>
    </Container>
  );
};

export default Login;
