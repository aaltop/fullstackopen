import styled from "styled-components"

export const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 50%;
`

export const GridDiv = styled.div`
    display: grid;
    align-items: center;
    text-align: center;
`

export const AppDiv = styled(FlexDiv)`
    font-family: sans-serif;
    font-size: large;
`

export const BlogListDiv = styled(FlexDiv)``
