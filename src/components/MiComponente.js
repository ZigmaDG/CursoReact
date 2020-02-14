import React, {Component} from 'react';

class MiComponente extends Component{

    render(){
        let receta = {
            nombre: 'pizza',
            ingredientes: ['Tomante', 'Queso', 'Jamón'],
            calorias: 400 + ' kcal'
        };

         return(

            <div className="MiComponente">

            <h1>{'Receta '+ receta.nombre}</h1>
            <h2> {'Calorias '+receta.calorias}</h2>
            <ol>

            
            {
                receta.ingredientes.map((ingredientes, i)=>{
                    console.log(ingredientes)
                    return(
                        <li key={i}>
                            {ingredientes}
                        </li>
                    );
                })
            }
            </ol>
            <hr/>
                {
                    this.props.saludo &&
                    <h3>{this.props.saludo}</h3>
                }
                 
            </div>   



         );
    }

}


export default MiComponente;