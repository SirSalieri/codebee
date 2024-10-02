import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useSpring, animated } from 'react-spring';

const themes = {
  dark: {
    body: '#000',
    text: '#fff',
    background: '#363537',
    menuItemColor: '#fff',
    menuItemHoverColor: '#ccc',
    titleColor: '#f0f0f0',
    textColor: '#ccc',
    buttonTextColor: '#fff',
    buttonHoverBackground: '#fff',
    buttonHoverColor: '#000',
  },
  
  light: {
    body: '#fff',
    text: '#363537',
    background: '#e2e2e2',
    menuItemColor: '#000',
    menuItemHoverColor: '#555',
    titleColor: '#363537',
    textColor: '#555',
    buttonTextColor: '#000',
    buttonHoverBackground: '#ddd',
    buttonHoverColor: '#333',
  }
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.body};
    transition: all 0.50s linear;
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  background: ${(props) => props.theme.background};
`;

const MenuItem = styled.a`
  margin: 0 15px;
  color: ${(props) => props.theme.menuItemColor};
  text-decoration: none;
  font-size: 16px;
  &:hover {
    color: ${(props) => props.theme.menuItemHoverColor};
  }
`;


const ToggleButton = styled.button`
  background: ${({ theme }) => theme.body === '#fff' ? '#000' : '#fff'};
  color: ${({ theme }) => theme.body === '#fff' ? '#fff' : '#000'};
  border: 2px solid ${({ theme }) => theme.body === '#fff' ? '#000' : '#fff'};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.5rem 1.5rem;
  margin: 10px;
  transition: all 0.3s ease;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfilePic = styled(animated.img)`
  width: 40%;
  height: auto;
  border-radius: 50%;
  margin-left: 5%;
  // align-self: flex-start;
  position: relative;
  overflow: hidden;
  display: block;

  
  &::after {
    content: '';
    position: absolute;
    top: -10px; right: -10px; bottom: -10px; left: -10px;
    background: inherit;
    filter: blur(10px);
    z-index: -1;
  }
`;

const Content = styled.div`
  width: 40%;
  text-align: right;
  margin-right: 5%;
  align-self: flex-end;
`;

const Title = styled(animated.div)`
  font-size: 2em;
  color: ${(props) => props.theme.titleColor};
`;

const Text = styled.p`
  font-size: 18px;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
`;

const Blob = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 650px;
  height: 650px;
  border-radius: 50%;
  background-image: linear-gradient(#1100ff 10%, #ff00f2);
  filter: blur(250px);
  transition: all 450ms ease-out;
  position: fixed;
  pointer-events: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translate(${(props) => props.x}px, ${(props) => props.y}px);
  z-index: -1;
`;

function App() {
  const profileProps = useSpring({ to: { opacity: 1, transform: 'translateY(0)' }, from: { opacity: 0, transform: 'translateY(-50px)' }, delay: 300 });
  const titleProps = useSpring({ to: { opacity: 1, transform: 'translateY(0)' }, from: { opacity: 0, transform: 'translateY(50px)' }, delay: 600 });
  const [theme, setTheme] = useState('dark');
  const [position, setPosition] = useState({ x: '-50%', y: '-50%' });
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX - window.innerWidth / 2;
      const y = event.clientY - window.innerHeight / 2;
      setPosition({ x, y });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <Menu>
        <MenuItem href="#">Home</MenuItem>
        <MenuItem href="#">About</MenuItem>
        <MenuItem href="#">Services</MenuItem>
        <MenuItem href="#">Contact</MenuItem>
      </Menu>
      <Blob x={position.x} y={position.y} /> {/* Ensure Blob is using the updated position */}
      <MainContainer>
        <ProfilePic style={profileProps} src="/public/pics/profil_pic.jpg" alt="Profile Picture" />
        <Content>
          <Title style={titleProps}>Reimagine a whole new world of endless opportunities.</Title>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </Content>
      </MainContainer>
      <ToggleButton onClick={toggleTheme}>Toggle Theme</ToggleButton>
      <Menu>
        <MenuItem href="#">Projects</MenuItem>
        <MenuItem href="#">About Mike'S</MenuItem>
        <MenuItem href="#">FAQ</MenuItem>
        <MenuItem href="#">Contact</MenuItem>
      </Menu>
    </ThemeProvider>
  );
}

export default App;
