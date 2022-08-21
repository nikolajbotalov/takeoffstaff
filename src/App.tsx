import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { SignIn } from "pages/auth/SignIn";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("to_token")) {
      return navigate("/main");
    }
  }, [navigate]);

  return (
    <App.Container>
      <SignIn />
    </App.Container>
  );
};

export default App;

App.Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eff4f5;
`;
