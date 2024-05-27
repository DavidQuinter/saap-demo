import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header/header';
import Nav from './components/nav/nav'
import SideBar from './components/sidebar/sideBar';
import Main from './components/main/main';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Header></Header>
  <Nav></Nav>
  <Main></Main>
  <SideBar></SideBar>
  </>
);

