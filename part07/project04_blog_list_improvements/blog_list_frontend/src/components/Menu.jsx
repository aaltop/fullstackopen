import { NavLink } from "react-router-dom"

import styled from "styled-components"

const MenuItem = styled(NavLink)`
    font-size: larger;
    text-decoration: none;
    color: white;

    &:visited {
        color: white;
    }

    &:hover {
        // background-color: ${props =>
            props.theme.bkgSoftHighlight};

        text-decoration: underline;
    }
`

function reactStyler({ isActive }) {
    return isActive
        ? {
              borderLeft: "5px solid #d60",
              backgroundColor: "#930",
              paddingLeft: "5px",
          }
        : {}
}

const NavBar = styled.nav`
    display: grid;
    grid-template-columns: 1fr;
    // border: 2px solid black;
    width: 200px;
`

export default function Menu() {
    return (
        <NavBar>
            <MenuItem to="/" style={reactStyler}>
                Blogs
            </MenuItem>
            <MenuItem to="/users" style={reactStyler}>
                Users
            </MenuItem>
        </NavBar>
    )
}
