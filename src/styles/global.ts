import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  } 

  html {
    @media(max-width: 1080px)  {
      font-size: 93.75%;
    }

    @media(max-width: 720px)  {
      font-size : 87.5%;
    }

    @media(max-width: 480px)  {
      font-size : 81.25%;
    }
  }

  body {
    color: ${props => props.theme['gray-100']};
    background-color: ${props => props.theme['gray-800']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1rem 'Roboto', sans-serif;
  } 

  button {
    cursor: pointer;
  }
`
