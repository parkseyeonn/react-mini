import styled from "styled-components";

const Container = styled.div`
  padding: 0 20px;
  max-width: ${props => props.theme.containerWidth};
  margin: 0 auto;
`;

export {
    Container,
}