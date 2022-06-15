import {Link} from "react-router-dom";
import styled from "styled-components";

const LinkList = styled.ul`
  li {
    margin-bottom: 10px;
  }
`;

function Index() {
    return (
        <LinkList>
            <li>
                <Link to={'/coins'}>Coins</Link>
            </li>
        </LinkList>
    )
}

export default Index;
