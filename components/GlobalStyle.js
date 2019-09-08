import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }
    body {
        margin: 0;
        height: 100%;
    }

    body > div {
        height: 100%
    }
`;

export default GlobalStyle;
