import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {Helmet} from "react-helmet";
import {useSetRecoilState} from "recoil";
import styled from "styled-components";
import {fetchCoins} from "../../api";
import {isDarkAtom} from "../../atoms";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.cardBgColor};
  border: 1px solid ${props => props.theme.borderColor};
  margin-bottom: 10px;
  color: ${props => props.theme.textColor};
  button {
    flex: 1;
    padding: 14px 10px;
    line-height: 14px;
    font-size: 14px;
    transition: .2s ease;
    &:hover{
      cursor: pointer;
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Coins() {
    const navigate = useNavigate();
    const setDarkAtom = useSetRecoilState(isDarkAtom);

    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    //
    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);

    const {isLoading, data} = useQuery<CoinInterface[]>("allCoins", fetchCoins);

    const navigateToDetail = (coin: CoinInterface) : void => {
        navigate(`/coin/${coin.id}`, {state: {name: coin.name}});
    };

    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>COIN</Title>
            </Header>
            {
                isLoading && <Loader>Loading...</Loader>
            }
            <CoinList>
                {
                    data?.slice(0, 100).map(coin => (
                        <Coin key={coin.id}>
                            <button type='button' onClick={() => navigateToDetail(coin)}>{coin.name} &rarr;</button>
                        </Coin>
                    ))
                }
            </CoinList>
        </Container>
    )
}

export default Coins;
