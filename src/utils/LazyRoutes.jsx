import { Outlet } from "react-router"
import styled from 'styled-components';
import { Suspense } from "react"

const Root = styled.div`
background:  ${props => props.theme.secondary};
min-height:calc(100vh - 180px)
`;
const LazyRoutes = () => {

    return (
        <Root>
             <Suspense fallback="...loading"><Outlet></Outlet></Suspense>
        </Root>
      
    )
}


export default LazyRoutes