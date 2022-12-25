import { MoralisProvider } from 'react-moralis'
import { TinderProvider } from '../context/TinderContext'
import '../styles/globals.css'
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";



function MyApp({ Component, pageProps }) {
  const supportedChainIds=[1,5]
  const connectors = {
    injected: {}
  }


  
  return( 

  <TinderProvider>

      <Component {...pageProps} />  

  </TinderProvider>

  )
}

export default MyApp
