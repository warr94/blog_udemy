import React, { Component } from 'react';

class SideBar extends Component {
    render() {
        return (
            <aside id="sidebar">
                <div id="nav-blog" className="sidebar-item">
                    <h3>Puedes hacer esto</h3>
                    <a href="#">Crear articulo</a>
                </div>
                <div id="search" className="sidebar-item">
                    <h3>Buscador</h3>
                    <p>Encuentra lo que buscas</p>
                    <form>
                        <input type="text" name="search" />
                        <input type="submit" name="submit" value="buscar" className="btn-buscar" />
                    </form>
                </div>
            </aside>
        );
    }
}

export default SideBar;