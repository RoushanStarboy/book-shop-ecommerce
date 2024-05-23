import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchToggle = styled.button`
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
`;

const SearchBarInput = styled.div`
  margin-left: 8px;

  &.search-bar-enter {
    opacity: 0;
    transform: scale(0.9);
  }

  &.search-bar-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }

  &.search-bar-exit {
    opacity: 1;
    transform: scale(1);
  }

  &.search-bar-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`;

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SearchBarContainer>
      <SearchToggle onClick={toggleSearchBar}>
        {isOpen ? 'Close' : 'Search'}
      </SearchToggle>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="search-bar"
        unmountOnExit
      >
        <SearchBarInput>
          <input type="text" placeholder="Search..." />
        </SearchBarInput>
      </CSSTransition>
    </SearchBarContainer>
  );
};

export default SearchBar;