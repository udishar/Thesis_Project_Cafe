import React from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Menu from '../Menu/menu';
import Middle from '../Middle/middle'
import Service from '../Services/services'

export default function Home(){
    return(
        <div >
        <Header/>
      <Middle/>
      <Menu/>
      <Service/>
      <Footer/>
      </div>
    )
}