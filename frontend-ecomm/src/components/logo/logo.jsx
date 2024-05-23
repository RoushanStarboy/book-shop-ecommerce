import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled component for individual letters
const Letter = styled.span`
  font-family: "Dancing Script", cursive;
  font-size: 50px;
  font-weight: ${({ isHighlighted }) => isHighlighted ? 'bold' : 'normal'};
  color: ${({ isHighlighted }) => isHighlighted ? '#512da8' : 'black'};
  transition: font-weight 0.5s ease-in-out, color 0.5s ease-in-out;
`;

// Main logo container
const LogoContainer = styled.div`
  display: flex;
`;

function Logo() {
  const text = "BookNest.In";
  const [activeIndex, setActiveIndex] = useState(0); // Start with the first letter active
  const [isComplete, setIsComplete] = useState(false); // Track if all letters have been highlighted

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        if (prev < text.length - 1) {
          return prev + 1;
        } else {
          setIsComplete(true); // All letters have been highlighted
          return prev; // Keep the last letter active
        }
      });
    }, 500); // Each letter changes every 0.5 seconds

    return () => clearInterval(interval);
  }, [text.length]);

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        setActiveIndex(0); // Restart from the first letter
        setIsComplete(false); // Reset completion status
      }, 2000); // All letters turn black after 2 seconds
    }
  }, [isComplete]);

  return (
    <LogoContainer>
      {text.split('').map((char, index) => (
        <Letter key={index} isHighlighted={isComplete || index <= activeIndex}>
          {char}
        </Letter>
      ))}
    </LogoContainer>
  );
}

export default Logo;
