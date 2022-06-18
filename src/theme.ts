import {DefaultTheme} from "styled-components";

const commonStyle = {
    defaultFontSize: '14px',
    titleFontSize: '30px',
    subTitleFontSize: '18px',

    containerWidth: '480px',
};

export const lightTheme: DefaultTheme = {
    textColor: 'black',
    bgColor: '#F9F9F9',
    accentColor: '#AA14F0',
    borderColor: '#433776',
    cardBgColor: '#fff',
    boardColor: '#dadfe9',
    cardColor: 'white',
    ...commonStyle,
};

export const darkTheme: DefaultTheme = {
    textColor: '#F9F9F9',
    bgColor: '#282c35',
    accentColor: '#9c88ff',
    borderColor: '#433776',
    cardBgColor: 'transparent',
    boardColor: '#dadfe9',
    cardColor: 'white',
    ...commonStyle,
};
