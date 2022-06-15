import {useLocation, useParams, Link, useNavigate, Outlet} from "react-router-dom";
import {useQuery} from "react-query";
import {Helmet} from "react-helmet";
import styled from "styled-components";
import {fetchCoinInfo, fetchCoinTickers} from "../../api";

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 48px;
  font-weight: bold;
  color: ${props => props.theme.accentColor}
`;

const Container = styled.div`
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0;      
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px 0;
  gap: 10px;
`;

const Tab = styled.span<{isActive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 7px 0;
  border-radius: 10px;
  color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Home = styled.div`
  position: absolute;
  left: 20px;
  top: 45px;
  cursor: pointer;
`;

interface LocationState {
    state: { name : string };
    pathname: string;
}

interface InfoData {
    id?: string;
    name?: string;
    symbol?: string;
    description?: string;
}

interface PriceData {
    total_supply?: number;
    max_supply?: number;
}

function Coin() {
    const navigate = useNavigate();
    const {coinId} = useParams<'coinId'>(); //useParams ts broken definition resolution
    const location = useLocation();
    const {pathname, state} = location as LocationState;
    // const {state} = useLocation<RouteState>(); //todo useLocation ts definition
    // const [info, setInfo] = useState<InfoData>({});
    // const [priceInfo, setPriceInfo] = useState<PriceData>({});
    // const [loading, setLoading] = useState(true);

    const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(
        ["info", coinId],
        () => fetchCoinInfo(coinId)
    );

    const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(
        ["tickers", coinId],
        () => fetchCoinTickers(coinId)
    );

    const loading = infoLoading || tickersLoading;

    // useEffect(() => {
    //     console.log(123);
    //     (async() => {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         const priceData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // }, []);

    const navigateToList = () => {
        navigate('/coins');
    };

    return (
        <Container>
            <Home onClick={navigateToList}>HOME</Home>
            <Helmet>
                <title>{state?.name ?? "loading"}</title>
            </Helmet>
            <Title>{loading ? "loading" : infoData?.name}</Title>
            {
                loading ? "loading..":
                    <>
                        <Overview>
                            <OverviewItem>
                                <span>Symbol: </span>
                                <span>{infoData?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Open Source: </span>
                                <span>{infoData?.description}</span>
                            </OverviewItem>
                        </Overview>
                        <Description>{infoData?.description}</Description>
                        <Overview>
                            <OverviewItem>
                                <span>Total Supply:</span>
                                <span>{tickersData?.total_supply}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Max Supply:</span>
                                <span>{tickersData?.max_supply}</span>
                            </OverviewItem>
                        </Overview>
                        <Tabs>
                            <Tab isActive={pathname.indexOf('chart') > -1}>
                                <Link to={`/coin/${coinId}/chart`}>Chart</Link>
                            </Tab>
                            <Tab isActive={pathname.indexOf('price') > -1}>
                                <Link to={`/coin/${coinId}/price`}>Price</Link>
                            </Tab>
                        </Tabs>
                        <Outlet />
                    </>
            }
        </Container>
    )
}

export default Coin;
