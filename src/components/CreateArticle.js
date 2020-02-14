import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

import Global from '../global';
import Sidebar from './Sidebar';
import swal from 'sweetalert';

// Validación de formularios y alertas


class CreateArticle extends Component {
    url = Global.url;

    titleRef = React.createRef();
    contentRef = React.createRef();
    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    componentWillMount() {
        this.validator = new SimpleReactValidator();
    }
    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        });
        this.validator.showMessages();
        this.forceUpdate();

    }

    saveArticle = (e) => {
        e.preventDefault();


        //Rellenar state con formulario
        this.changeState();

        if (this.validator.allValid()) {



            //Hacer petición http por post para guardar el articulo

            axios.post(this.url + 'save', this.state.article)
                .then(res => {
                    if (res.data.article) {

                        this.setState({

                            article: res.data.article,
                            status: 'waiting'
                        });


                        swal(
                            'Articulo creado',
                            'El articulo ha sido creado correctamente',
                            'success'
                        );
                        //subir imagen

                        if (this.state.selectedFile !== null) {
                            //sacar el id de el articulo guardado
                            var articleId = this.state.article._id;

                            // crear form data y añadir archivo
                            const formData = new FormData();


                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            // peticion ajax
                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        this.setState({

                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({

                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                });
                        } else {
                            this.setState({


                                status: 'success'
                            });
                        }


                    } else {
                        this.setState({

                            status: 'failed'

                        });
                    }
                });

        } else {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({

                status: 'failed'

            });
        }

    }


    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });

    }

    render() {

        if (this.state.status === 'success') {
            return <Redirect to="/Blog" />
        }


        return (

            <div className="center">

                <section id="content">
                    <h1 className="subheader">Crear artículo</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>

                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />
                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>


                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState} />
                            {this.validator.message('content', this.state.article.content, 'required')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">Imágen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success" />                  </form>
                </section>
                <Sidebar />
            </div>

        );
    }
}
export default CreateArticle;