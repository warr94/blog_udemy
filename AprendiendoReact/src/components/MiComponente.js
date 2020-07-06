import React, { Component } from 'react';

class MiComponente extends Component {

    render() {

        let receta = {
            nombre: "Pizza",
            ingredientes: ['Tomate', 'Queso', 'Jamon'],
            calorias: 400
        }


        return (
            <div className="mi-componente">
                <h2>{'Receta: ' + receta.nombre}</h2>
                <h4>{'Calorias: ' + receta.nombre}</h4>
                <ol>
                    {
                        receta.ingredientes.map((ingredientes, i) => {

                            return (
                                <li key={i}>
                                    {i + 1 + '. ' + ingredientes}
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        );
    }
}

export default MiComponente;