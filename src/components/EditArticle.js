import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import Global from '../global';
import Sidebar from './Sidebar';
import swal from 'sweetalert';

//  1. Recoger el id del articulo a editar de la url
//  2. Crear un metodo para sacar el objeto del backend
//  3. Repoblar / rellenar el formulario con esos datos
//  4. Actualixar el objeto haciendo una petición al backend


class EditArticle extends Component {
    url = Global.url;
    articleId = null;

    titleRef = React.createRef();
    contentRef = React.createRef();
    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    componentWillMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
        this.validator = new SimpleReactValidator();
    }


    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({

                    article: res.data.article,

                });
            })

    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
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

            axios.put(this.url + 'article/' + this.articleId, this.state.article)
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
        console.log(this.state.article);

        if (this.state.status === 'success') {
            return <Redirect to="/Blog" />
        }
        var article = this.state.article;

        return (

            <div className="center">

                <section id="content">
                    <h1 className="subheader">Editar artículo</h1>
                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>

                            <div className="form-group">
                                <label htmlFor="title">Título</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />
                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>


                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" ref={this.contentRef} defaultValue={article.content} onChange={this.changeState} />
                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">Imágen</label>
                                <input type="file" name="file0" defaultValue={article.image} onChange={this.fileChange} />
                                <div className="image-wrap">
                                    {article.image !== null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title}  className="thumb"/>
                                    ) : (<img src="https://www.blogdelfotografo.com/wp-content/uploads/2019/03/faro-noche.jpg"
                                            alt={article.title}  className="thumb"/>)
                                    }
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }
                    {!this.state.article.title &&
                        <h2 className="subheader">Cargando...</h2>

                    }

                </section>
                <Sidebar />
            </div>

        );
    }
}
export default EditArticle;