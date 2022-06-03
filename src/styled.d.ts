import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentColor: string;
        borderColor: string;
        cardBgColor: string;
        boardColor: string;
        cardColor: string;
    }
}
