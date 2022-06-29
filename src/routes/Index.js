import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkList = styled.ul`
  li {
    margin-bottom: 10px;
    a {
        color: ${props => props.theme.accentColor};
        font-weight: 500;
        font-size: ${props => props.theme.subTitleFontSize};
    }
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: ${props => props.theme.textColor};
  font-weight: bold;
  font-size: ${props => props.theme.titleFontSize};
`;

function Index() {
    return (
        <>
           <Title>PROJECT LIST</Title>
            <LinkList>  
                <li>
                    <Link to={'/coins'}>Coins</Link>
                </li>
                <li>
                    <Link to={'/todos'}>ToDos</Link>
                </li>
                <li>
                    <Link to={'/time'}>Time</Link>
                </li>
                <li>
                    <Link to={'/components'}>components</Link>
                </li>
                <li>
                    <Link to={'/typescript/todo'}>todo list</Link>
                </li>
            </LinkList> 
        </>
    )
}

export default Index;
