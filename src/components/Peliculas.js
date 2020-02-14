import React, { Component } from 'react';
import Pelicula from './Pelicula';

class Peliculas extends Component {

    state = {};


    cambiarTitulo = () =>{

        var {peliculas} = this.state;
        //var random = Math.floor(Math.random() * 3);
        peliculas[0].titulo = "Batman Begins";

        this.setState({
            peliculas:peliculas
        });
    }

    favorita = (pelicula, indice) =>{
        console.log("Marcada");
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        })

    }

    componentWillMount (){
        this.setState({
            peliculas: [

                { titulo: 'Batman vs Superman', image: 'https://as.com/ocio/imagenes/2016/03/21/cine/1458576764_617331_1458577352_noticia_grande.jpg' },
                { titulo: 'Amigos intocables', image: 'data:image/jpeg;base64,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' },
                { titulo: 'Spiderman Far from Home', image: 'https://dam.smashmexico.com.mx/wp-content/uploads/2019/07/spider-man-far-from-home-explicacion-final-cover.jpg' },
    
    
            ],
            nombre: 'Guillermo Ramos',
            favorita: {}
        });

    }


    componentDidMount (){

    }

    componentWillUnmount (){

    }

    
    render() {

        var pStyle = {
            background : 'green',
            color: 'white',
            paddin: '10px'
        }



        return (

            <div className="peliculas" id="content">

                <h2 className="subheader">Peliculas</h2>
                <p>Selección de las peliculas favoritas de {this.state.nombre}</p>
                <p> <button onClick={this.cambiarTitulo}>
                        Cambiar titulo de Batman
                    </button>
                </p>
                {
                    this.state.favorita.titulo ? (
                    <p className="favorita" style={pStyle}>
                        <strong>La pelicula favorita es: </strong>
                        <span>{this.state.favorita.titulo}</span>
                    </p>
                    ) : (
                        <p>No hay pelicula favorita</p>
                    )
                }
                
                {/**Crear componente peliculas */}
                <div id="articles" className="peliculas">
                    {
                        this.state.peliculas.map((pelicula, i) => {
                            return (
                                <Pelicula 
                                key={i} 
                                pelicula={pelicula}
                                indice = {i}
                                marcarFavorita={this.favorita}/>
                            )

                        })
                    }
                </div>
            </div>


        );
    }

}

export default Peliculas;