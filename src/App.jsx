import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnimatedRoutes from './lib/AnimatedRoutes'
import { ThemeProvider } from 'styled-components'


let light_theme = {
  primary: '#ffffff',
  primary_light: '#f3f4f6',
  secondary: ' #f3f4f6',
  accent: '#8bab50',
  text: '#0e1e3f',
  textW: '#ffffff',
  warn: "#f44336",
  input:"#ffffff",
  drawer: {
    primary: '#ffffff',
    secondary: '#ffffff',
  },
  btn: {
    primary: '#3f3838',
    secondary: '#0000009c',
    text: '#8bab50',
    hover: '#8bab50bd'
  },
  divider: {
    primary: '#8bab50',
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
  notification_card:{
    active:'#000000',
    inactive:'#101010'
  }
}

let dark_theme = {
  primary: '#000000',
  primary_light: '#121212',
  secondary: '#151515',
  accent: '#8bab50',
  text: 'white',
  textW: '#000000',
  warn: "#f44336",
  input:"#ffffff",
  drawer: {
    primary: 'black',
    secondary: 'black',
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
  notification_card:{
    active:'#000000',
    inactive:'#101010'
  }
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



  return (
    <div onClick={()=>{console.log("trigger sound")}}>
      <ThemeProvider theme={theme}>
        <AnimatedRoutes themeType={themeType} toggleTheme={toggleTheme}/>
      </ThemeProvider>
    </div>
  )
}

export default App
