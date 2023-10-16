import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnimatedRoutes from './lib/AnimatedRoutes'
import { ThemeProvider } from 'styled-components'
import Black from './assets/images/black.jpg'
import White from './assets/images/white.jpg'
import { getCookieValue } from './helpers/getCookieValue'
import { useCookies } from 'react-cookie'

let light_theme = {
  primary: '#ffffff',
  primary_light: 'aliceblue',
  secondary: ' aliceblue',
  accent: '#66b394',
  text: '#0e1e3f',
  textW: '#ffffff',
  warn: "#f44336",
  input:"#ffffff",
  shadow:"#d5e5f3",
  banner:{
    image:White,
    primary:'aliceblue',
    secondary:'aliceblue'
  },
  drawer: {
    primary: '#ffffff',
    secondary: '#ffffff',
  },
  btn: {
    primary: '#3f3838',
    secondary: '#0000009c',
    text: 'white',
    hover: '#8bab50bd'
  },
  divider: {
    primary: '#66b394',
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
    active:'#ffffff',
    inactive:'#ebebeb',
  },
  glass:{
    background:'#f0f8ff87'
  }
}

let dark_theme = {
  primary: '#0a0a0a',
  primary_light: '#121212',
  secondary: '#121212',
  accent: '#66b394',
  text: 'white',
  textW: '#0a0a0a',
  warn: "#f44336",
  input:"#ffffff",
  shadow:"#04040485",
  banner:{
    image:Black
  },
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
    primary: '#66b394',
  },
  modal: {
    primary: '#0a0a0a',
    secondary: '#121212c4',
    text: 'black',
  },
  nav: {
    primary: ' #0a0a0a',
    secondary: '#151515',
  },
  notification_card:{
    active:'#0a0a0a',
    inactive:'#101010'
  },
  glass:{
    background:'#04040485'
  }
}


function App() {

  const dispatch = useDispatch()
  const [cookies, setCookie,removeCookie] = useCookies();

  const [theme, setTheme] = useState(dark_theme)
  const [themeType, setThemeType] = useState("dark")


  useEffect(() => {
     if(cookies?.theme?.theme == "dark"){
      setTheme(dark_theme)
      setThemeType("dark")
    }else{
      setTheme(light_theme)
      setThemeType("light")
    }
  }, [])
  
  const toggleTheme = ()=>{
    if(themeType == "dark"){
      removeCookie("theme")
      setCookie("theme",JSON.stringify({theme:"light"}))
      setTheme(light_theme)
      setThemeType("light")
    }else{
      removeCookie("theme")
      setCookie("theme",JSON.stringify({theme:"dark"}))
      setTheme(dark_theme)
      setThemeType("dark")
    }
  }



  return (
      <ThemeProvider theme={theme}>
        <AnimatedRoutes themeType={themeType} toggleTheme={toggleTheme}/>
      </ThemeProvider>
  )
}

export default App
