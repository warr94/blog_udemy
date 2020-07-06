import React, { Component } from 'react';
import logo from '../assets/images/logo.svg'

class Header extends Component {

    render() {
        return (
            <header id="header">

                <div className="center">
                    {/*<!---LOGO--->*/}
                    <div id="logo">
                        <img src={logo} className="app-logo" alt="logotipo" />
                        <span id="brand">
                            <strong>Curso</strong>React
                </span>
                    </div>
                    {/*<!---MENU--->*/}
                    <nav id="menu">
                        <ul>
                            <li>
                                <a href="index.html">Inicio</a>
                            </li>
                            <li>
                                <a href="blog.html">Blog</a>
                            </li>
                            <li>
                                <a href="formulario.html">Formulario</a>
                            </li>
                            <li>
                                <a href="#">pagina1</a>
                            </li>
                            <li>
                                <a href="#">Pagina2</a>
                            </li>
                        </ul>
                        <div className="clearfix"></div>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;