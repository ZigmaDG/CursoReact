import React, {Component} from 'react';
import MiComponente from './MiComponente';
import Peliculas from './Peliculas';

class SeccionPruebas extends Component {



state = {
  contador : 0
}

  sumar =(e) =>{
         // this.state.contador = this.state.contador+1;
         this.setState({
           contador: (this.state.contador+1)
         });

  }

  restar(e){
    //this.state.contador = this.state.contador-1;
    this.setState({
      contador: (this.state.contador-1)
    });

  }

    render() {

        return (
            <section id="content">
        
            <p>
              Edit <code>src/App.js</code> and save to reload.
           
            </p>
           
            <section className="componente">
    
              <MiComponente/>
              <Peliculas/>
              
            </section>

              <h2 className="subheader">ESTADO</h2>
              <p>
                 Contado: {this.state.contador}
              </p>

              <p>

                <input type="button" value ="Sumar" onClick={this.sumar.bind(this)}/>
                <input type="button" value ="Restar" onClick={this.restar.bind(this)}/>


              </p>




            </section>
        );
    }


  
}

export default SeccionPruebas;