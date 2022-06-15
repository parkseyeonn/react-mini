import { createGlobalStyle, ThemeProvider } from "styled-components";
import {useRecoilValue} from "recoil";
import Router from "./Router";
import {isDarkAtom} from "./atoms";
import {darkTheme, lightTheme} from "./theme";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  padding: 60px 20px;
  font-weight: 300;
  font-family: 'Kanit', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const Header = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  button {
    border: none;
    background: none;
    padding: 0;
    font-size: 30px;
  }
`;

const backHome = () => {
    window.location.href = '/';
};

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Header>
            <button onClick={backHome}>⌂</button>
        </Header>
        <Router />
      </ThemeProvider>
  );
}

export default App;
