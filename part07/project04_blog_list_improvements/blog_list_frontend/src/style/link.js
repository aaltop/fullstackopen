import styled from "styled-components"
import { Link as RouterLink } from "react-router-dom"

export const Link = styled(RouterLink)`
    color: ${props => props.theme.linkUnvisited};

    &:visited {
        color: ${props => props.theme.linkVisited};
    }
`
