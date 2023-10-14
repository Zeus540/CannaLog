import React from 'react'
import styled,{keyframes,css} from "styled-components";


const Water = keyframes`
0%,
	100% {
		clip-path: polygon(
			0% 45%,
			16% 44%,
			33% 50%,
			54% 60%,
			70% 61%,
			84% 59%,
			100% 52%,
			100% 100%,
			0% 100%
		);
	}

	50% {
		clip-path: polygon(
			0% 60%,
			15% 65%,
			34% 66%,
			51% 62%,
			67% 50%,
			84% 45%,
			100% 46%,
			100% 100%,
			0% 100%
		);
	}
`

const Root =  styled.div`
position: relative;
display: inline-block;
`
const Text =  styled.div`

color: ${props => props.theme.accent};
 
    :nth-child(1){
        color: transparent;
        -webkit-text-stroke: 0px ${props => props.theme.accent};
       
    }
    :nth-child(2){
        color: ${props => props.theme.accent};
        animation: ${Water} 4s linear infinite;
        position: absolute;
        top: 0px;
        right: 0px;
        left: 0px;
        bottom: 0px;
    }
`


const WaveHeading = ({heading}) => {
  return (
    <Root>
        <Text>
         {heading}
        </Text>
        <Text>
        {heading}
        </Text>
    </Root>
  )
}

export default WaveHeading