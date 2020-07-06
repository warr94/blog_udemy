import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

//Importar componentes propios
import MiComponente from './components/MiComponente';
import Peliculas from './components/Peliculas';
import Header from './components/Header';
import Slider from './components/Slider';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Slider />

      <div class="center">

        <section id="content">

          <Peliculas />

        </section>

        <SideBar />

      </div>
      <div className='clearfix'></div>
      <Footer />
    </div>
  );
}

export default App;
