import React, { Component } from 'react';
import MensajeEstatico from './MensajeEstatico';
import Pelicula from './Pelicula';

class Peliculas extends Component {

    state = {
        pelicula: [
            { titulo: 'Batman vs Superman', image: 'https://vignette.wikia.nocookie.net/batman/images/2/26/Who_Will_Win.jpg/revision/latest?cb=20160124201818&path-prefix=es' },
            { titulo: 'Gran Torino', image: 'https://pics.filmaffinity.com/Gran_Torino-278262332-large.jpg' },
            { titulo: 'Looper', image: 'https://pics.filmaffinity.com/Looper-874353819-large.jpg' }
        ],
        nombre: 'Walter Recinos',
        favorita: {}
    };

    cambiarTitulo = () => {

        var { pelicula } = this.state;
        pelicula[0].titulo = "Batman Begins";

        this.setState({
            pelicula: pelicula
        })
    }

    favorita = (pelicula, indice) => {
        console.log("FAVORITA MARCAR");
        console.log(pelicula, indice);

        this.setState({
            favorita: pelicula
        })
    }


    render() {

        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        }

        return (
            <div className="peliculas">
                <h2 className="subheader">Peliculas</h2>
                <p>Seleccion de las peliculas favoritas de {this.state.nombre}</p>
                <p>
                    <button onClick={this.cambiarTitulo}>Cambiar el titulo</button>
                </p>

                {this.state.favorita.titulo &&

                    <p className='favoritas' style={pStyle}>
                        <strong>La pelicula favorita es: </strong>
                        <span>{this.state.favorita.titulo}</span>
                    </p>

                }

                {/*Crear el componente para mostrar las peliculas*/}

                <div id="articles" className="peliculas">
                    {
                        this.state.pelicula.map((pelicula, i) => {

                            return (
                                <Pelicula
                                    key={i}
                                    pelicula={pelicula}
                                    indice={i}
                                    marcarFavorita={this.favorita}
                                />
                            )

                        })
                    }
                </div>
                <MensajeEstatico />
            </div>
        );
    }
}

export default Peliculas;