import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import { Container } from "./layout";
import styled from "styled-components";

import Index from "./routes/Index";

//coin pages
import Coin from "./routes/coin/Coin";
import Coins from "./routes/coin/Coins";
import Price from "./routes/coin/Price";
import Chart from "./routes/coin/Chart";

//todos pages
import ToDoList from "./routes/toDo/ToDoList";
import ReactForm from "./routes/toDo/ReactForm";

//time pages
import Time from "./routes/time/Time";

import ToDo from "./routes/typescript/ToDo";

import Components from "./routes/components/Components";

const Header = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
`;

const Home = styled.button`
  padding: 0;
  font-size: 24px;
  color: ${props => props.theme.textColor};
`;

const DarkMode = styled.button`
  font-size: 24px;
`;

function RouterInner() {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useRecoilState(isDarkAtom);
    const toggleDark = () => setIsDark(prev => !prev);
  
    const backHome = () => {
      navigate('/');
    };
    return (
        <Container>
            <Header>
                <Home type='button' onClick={backHome}>🏠</Home>
                <DarkMode type='button' onClick={toggleDark}>{isDark ? '🌙' : '🌞'}</DarkMode>
            </Header>
            <Routes>
                <Route path="/coin/:coinId" element={<Coin />}>
                    <Route path={`price`} element={<Price />}/>
                    <Route path={`chart`} element={<Chart />}/>
                </Route>
                <Route path="/coins" element={<Coins />} />
                <Route path="/todos" element={<ToDoList />}/>
                <Route path="/todo/form" element={<ReactForm />}/>
                <Route path="/time" element={<Time />}/>
                <Route path="/typescript/todo" element={<ToDo />}/>
                <Route path="/components" element={<Components />}/>
                <Route path="/" element={<Index />}/>
            </Routes>
        </Container>
    ); 
}

function Router() {

    return (
        <BrowserRouter>
            <RouterInner />
        </BrowserRouter>
    )
}

export default Router;
