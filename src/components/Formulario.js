import React, { Component } from 'react';
import Sidebar from './Sidebar';



class Formulario extends Component {

    nombreRef= React.createRef();
    apellidosRef= React.createRef();
    bioRef= React.createRef();
    generoRef= React.createRef();
    


    state = {
        user: {}
    };

    recibirFormulario = (e) => {
        e.preventDefault();

        var genero = 'hombre';

       /* if(this.generoHRef.current.selected){
                genero = this.generoHRef.current.value;
        }else if(this.generoMRef.current.selected){
            genero = this.generoMRef.current.value;
        }else{
            genero = this.generoORef.current.value
        }
*/
        var user  = {
            nombre: this.nombreRef.current.value,
            apellidos:this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: this.generoRef.current.value
        }
        this.setState({
            user:user
        });
        console.log("formulario enviado");
        console.log(genero);
        


    }
    render() {

        if(this.state.user.nombre){
                var user = this.state.user;
        }
        return (

            <div id="formulario">
             
                <div className="center">
                    <div id="content">
                    <h1 className="subheader">Formulario</h1>


                        {/* Mostrar datos del formulario */}

                        {this.state.user.nombre &&
                            <div id="user-data">
                            <p> Nombre: <strong>{user.nombre}</strong></p>
                            <p> Apellidos: <strong>{user.apellidos}</strong></p>
                            <p> Genero: <strong>{user.genero}</strong></p>
                            <p> Bio: <strong>{user.bio}</strong></p>
                            </div>
                        }
                        {/* Crear formulario*/}


                        <form action="" className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>

                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografía</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>
                            </div>

                            <div className="form-group">
                            <label htmlFor="bio">Genero</label>
                                <select className="select" ref={this.generoRef}>
                                   <option value="Hombre">Hombre</option>
                                   <option value="Mujer" >Mujer</option> 
                                   <option value="Otro">Otro</option> 
                                </select>
                                
                            </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="Enviar" className="btn btn-success" />

                        </form>


                    </div>
                  
                </div>
                <Sidebar
                        blog="false" />
            </div>

        );
    }
}

export default Formulario;
