import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnimatedRoutes from './lib/AnimatedRoutes'
import { fetchPublicPlants, fetchEnvironmentTypes } from './features/'
import { ThemeProvider } from 'styled-components'


let light_theme = {
  primary: ' #f3f4f6',
  primary_light: '#f3f4f6',
  secondary: '#ffffff',
  accent: '#8bab50',
  text: '#0e1e3f',
  textW: '#ffffff',
  warn: "#f44336",
  drawer: {
    primary: '#ffffff',
    secondary: '#f3f4f6',
  },
  btn: {
    primary: '#3f3838',
    secondary: '#0000009c',
    text: '#8bab50',
    hover: '#8bab50bd'
  },
  divider: {
    primary: '#3f3838',
  },
  modal: {
    primary: '#ffffff',
    secondary: '#c7c7c79c',
    text: 'black',
  },
  nav: {
    primary: '#ffffff',
    secondary: '#f3f4f6',
  },
}

let dark_theme = {
  primary: ' #000000',
  primary_light: '#121212',
  secondary: '#151515',
  accent: '#8bab50',
  text: 'white',
  textW: '#000000',
  warn: "#f44336",
  drawer: {
    primary: 'black',
    secondary: '#0000009c',
  },
  btn: {
    primary: 'black',
    secondary: '#0000009c',
    text: 'white',
    hover: '#8bab50bd'
  },
  divider: {
    primary: '#ffffff73',
  },
  modal: {
    primary: '#000000',
    secondary: '#121212c4',
    text: 'black',
  },
  nav: {
    primary: ' #000000',
    secondary: '#151515',
  },
}


function App() {

  const dispatch = useDispatch()


  const [theme, setTheme] = useState(dark_theme)
  const [themeType, setThemeType] = useState("dark")


  const toggleTheme = ()=>{
    if(themeType == "dark"){
      setTheme(light_theme)
      setThemeType("light")
    }else{
      setTheme(dark_theme)
      setThemeType("dark")
    }
  }

  useEffect(() => {
    dispatch(fetchPublicPlants())
  
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <AnimatedRoutes themeType={themeType} toggleTheme={toggleTheme}/>
      </ThemeProvider>
    </>
  )
}

export default App
