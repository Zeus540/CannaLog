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
 

`


const WaveHeading = ({heading}) => {
  return (
    <Root>
        <Text>
         {heading}
        </Text>
      
    </Root>
  )
}

export default WaveHeading