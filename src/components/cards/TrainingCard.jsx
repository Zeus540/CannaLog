import React from 'react'
import styled from 'styled-components'

const Holder = styled.div`
background: ${(props) => props.theme.primary};
width: calc(100% / 6 - 20px);
padding: 10px;
border-radius: 5px;
display: flex;
align-items: center;
margin: 10px 5px;
img{
    min-width:50px;
    margin-right: 10px;
    background: ${(props) => props.theme.secondary};
    background: aliceblue;
    border-radius: 50%;
}
p{
    font-size: 16px;
    color:${(props) => props.theme.text}
}
`

export const TrainingCard = ({img,name}) => {
    console.log("img",img)
  return (
 <div>
 
  <Holder>
        <img src={img} width="100%"/>
   <div>
   <p>{name}</p>
        <p>Technique</p>
    </div>
    </Holder>
   
 </div>
  )
}
