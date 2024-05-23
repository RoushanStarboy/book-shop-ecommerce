import React from 'react';
import ButtonComponent from './components/buttonComponent/buttoncomp';

const LayoutComponent = ({ children }) => {
  const handleClick = () => {
    console.log('Button clicked!');
    // Implement the action here
  };

  return (
    <>
      <ButtonComponent onClick={handleClick} label="Click Me" />
      <div>
        {children}  {/* This will render the content of each page */}
      </div>
    </>
  );
};

export default LayoutComponent;
