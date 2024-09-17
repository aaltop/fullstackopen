import { GridDiv, FlexDiv } from "./div"

import styled from "styled-components"

export const AppDiv = styled(GridDiv)`
    grid-template-areas:
        "header header header"
        "nav main side"
        ". footer .";

    grid-template-columns: 15% 70% 15%;
    grid-template-rows: 100px minmax(100px, auto) 100px;

    align-items: start;
`

export const Header = styled.header`
    grid-area: header;

    position: fixed;
    width: 100%;
    height: 100px;
`

export const Nav = styled.nav`
    grid-area: nav;

    position: fixed;
    top: 100px;
    width: 15%;
    bottom: 0px;

    overflow-y: auto;

    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min(3em);
    border: 2px solid black;
`

export const MainView = styled(FlexDiv)`
    grid-area: main;
`

export const SideView = styled(FlexDiv)`
    grid-area: side;

    position: fixed;
    left: 85%;
    right: 0px;
`

export const Footer = styled.footer`
    grid-area: footer;
`
