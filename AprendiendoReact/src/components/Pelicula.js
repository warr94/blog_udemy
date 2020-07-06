import React, { Component } from 'react';

class Pelicula extends Component {

    marcar = () => {
        this.props.marcarFavorita(this.props.pelicula, this.props.indice);
    }

    render() {

        const pelicula = this.props.pelicula;
        const { titulo, image } = this.props.pelicula;

        return (
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={titulo} height="100px" width="100px" />
                </div>
                <h2>{titulo}</h2>
                <span className="date">
                    Hace 5 min
                                </span>
                <a href="#">Leer más</a>
                <button onClick={this.marcar}>Marcar como favorito</button>

                <div className="clearfix"></div>
                {/*<!--Sirve para limpiar los elementos flotados-->*/}
            </article>
        );
    }
}

export default Pelicula;