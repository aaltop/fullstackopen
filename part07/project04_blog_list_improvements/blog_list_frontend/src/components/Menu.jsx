import { Nav } from "../style/view"

import { NavLink } from "react-router-dom"

import styled from "styled-components"

const MenuItem = styled(NavLink)`
    font-size: larger;
    text-decoration: none;
    color: white;
    padding-block: 0.5em;

    &:visited {
        color: white;
    }

    &:hover {
        background-color: ${props =>
            props.theme.bkgSoftHighlight};

        text-decoration: underline;
    }
`

function reactStyler({ isActive }) {
    return isActive
        ? {
              borderLeft: "5px solid rgb(from #e73 r g b)",
              backgroundColor: "rgb(from #e73 r g b / 30%)",
              paddingLeft: "5px",
          }
        : {}
}

export default function Menu() {
    return (
        <Nav>
            <MenuItem to="/" style={reactStyler}>
                Blogs
            </MenuItem>
            <MenuItem to="/users" style={reactStyler}>
                Users
            </MenuItem>
        </Nav>
    )
}
