import { styled } from "@mui/system";
import { useTypedDispatch, useTypedSelector } from "./utils/hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import TodosPage from "./components/TodosPage";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import { useEffect } from "react";
import { Thunks } from "./store/thunks";
import Panel from "./components/Panel";

const AppContainer = styled("div")({
  width: "100vw",
  height: "100vh",
  margin: "0",
  padding: "0",
});

function App() {
  const { authorized } = useTypedSelector(state => state);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (localStorage.getItem("jwt-token")) {
      dispatch(Thunks.getProfile());
    }
  }, [])
  return (
    <AppContainer>
      <Panel/>
      { authorized
        ? <Routes><Route path="/" element={<TodosPage/>}/> <Route path="*" element={<Navigate to="/"/>}/></Routes>
      
        : <Routes>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/signin" element={<SigninPage/>}/>
            <Route path="*" element={<Navigate to="/signin"/>}/>
          </Routes>}
    </AppContainer>
  );
}

export default App;
