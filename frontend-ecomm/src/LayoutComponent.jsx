import React from 'react';
import ButtonComponent from './components/buttonComponent/buttoncomp';

const LayoutComponent = ({ children }) => {
  const handleClick = () => {
    window.alert("Worked");
  };

  return (
    <>
      <ButtonComponent onClick={handleClick}/>
      <div>
        {children}  {/* This will render the content of each page */}
      </div>
    </>
  );
};

export default LayoutComponent;
