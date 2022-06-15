import {BrowserRouter, Routes, Route} from "react-router-dom";
import Index from "./routes/Index";

//coin pages
import Coin from "./routes/coin/Coin";
import Coins from "./routes/coin/Coins";
import Price from "./routes/coin/Price";
import Chart from "./routes/coin/Chart";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/coin/:coinId" element={<Coin />}>
                    <Route path={`price`} element={<Price />}/>
                    <Route path={`chart`} element={<Chart />}/>
                </Route>
                <Route path="/coins" element={<Coins />} />
                <Route path="/" element={<Index />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
