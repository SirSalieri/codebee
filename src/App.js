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
  border-radius: 50%; // Adjust to make it circular if you use an icon
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.5rem;
  margin: 10px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.6rem; // Smaller font for mobile
    padding: 0.4rem;
    top: 15px;
    right: 15px;
  }

  @media (max-width: 480px) {
    top: 10px; // Further adjust for very small screens
    right: 10px;
  }
`;


const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 50px; // Adds padding around the content to prevent touching the edges
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-around; // Ensures space between items is maintained
  }
`;


const ProfilePic = styled(animated.img)`
  width: 30%; // Adjusted width for better spacing
  height: auto;
  border-radius: 50%;
  transition: transform 0.3s ease-out;
  &:hover {
    transform: scale(1.1); // Slightly larger scale for emphasis
  }
  @media (max-width: 768px) {
    width: 50%; // Larger on smaller screens for visibility
  }
`;


const Content = styled.div`
  width: 60%; // Allows text more room
  text-align: right;
  transition: transform 0.3s ease-out;
  &:hover {
    transform: translateX(-10px); // Subtle movement to add dynamic effect
  }
  @media (max-width: 768px) {
    width: 80%; // More width on smaller screens
    text-align: center;
    order: -1; // Brings text above the image on smaller screens
  }
`;


const Title = styled(animated.div)`
  font-size: 2em;
  color: ${(props) => props.theme.titleColor};
  position: relative;
  padding: 5px 20px; 
  margin: 5px 0;
  overflow: hidden;
  border-radius: 10px;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.2);
    filter: blur(8px);
    z-index: -1;
  }

  &::before {
    content: '';
    position: absolute;
    width: 120%; 
    height: 100%;
    top: 0;
    left: -150%;  // Starts from left, off-screen
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.7), transparent);
    filter: blur(5px);
    transition: transform 0.7s ease-out;
    z-index: 0;
  }

  &:hover::before {
    transform: translateX(200%);  // Moves the wave across the text
  }
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
  const TitleComponent = ({ children }) => {
    const [hover, setHover] = useState(false);
  
    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);
  
    return (
      <Title onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ transform: hover ? 'translateX(-66.66%)' : 'translateX(0)' }}>
        {children}
      </Title>
    );
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
        <ProfilePic style={profileProps} src="/pics/profile_pic.JPG" alt="Profile Picture" />
        <Content>
          <Title style={titleProps}>Reimagine a whole new world of endless opportunities.</Title>
          <Text>Enhancing your digital presence with customized web and software solutions.</Text>
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
