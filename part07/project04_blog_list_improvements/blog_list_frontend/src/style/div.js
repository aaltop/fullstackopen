import styled from "styled-components"

export const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 75%;
`

export const GridDiv = styled.div`
    display: grid;
    align-items: center;
    text-align: center;
`

export const FormDiv = styled(GridDiv)`
    grid-template-columns: 1fr 2fr;
    text-align: start;
`

export const BlogListDiv = styled(FlexDiv)``
