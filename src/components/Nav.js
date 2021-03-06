import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NavLink from './NavLink';
import SearchIcon from '../assets/search.png';
import MovieIcon from '../assets/movie.png';
import TvIcon from '../assets/tv.png';
import HomeIcon from '../assets/home.png';
import SearchBar from './SearchBar';

const NavBar = styled.nav`
 height: 50px;
 display: flex;
 align-items: center;
 justify-content: space-around;
 background-color: #000;
 color: #fff;

 @media (min-width: 780px) {
   width: 100px;
   height: 100%;
   flex-direction: column;
   justify-content: normal;
 };
`;

const Nav = () => {

  const [searchInput, setSearchInput] = useState('');  
  const [hidden, setHidden] = useState(true);  
  const history = useHistory(); 
   
  const handleChange = e => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/search/${searchInput}`);
    setHidden(!hidden);
  };

  const showSearchBar = () => {
    setHidden(!hidden);
  };

  return (
    <NavBar>
      <NavLink link={'/'} src={HomeIcon}/>
      <NavLink link={'/tv'} src={TvIcon}/>
      <NavLink link={'/movie'} src={MovieIcon}/>
      <NavLink showSearchBar={showSearchBar}  src={SearchIcon}/>
      <SearchBar hidden={hidden} handleSubmit={handleSubmit} showSearchBar={showSearchBar} handleChange={handleChange}/>
    </NavBar>    
  );
};

export default Nav;