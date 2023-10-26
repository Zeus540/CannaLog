
import styled from 'styled-components'
import { TailSpin } from 'react-loader-spinner'

const LoaderHolder = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;


`

const Loader = () => {
    return (
        <LoaderHolder
 
        >

<TailSpin
  height="40"
  width="40"
  color="mediumseagreen"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
        </LoaderHolder>
    )
}

export default Loader