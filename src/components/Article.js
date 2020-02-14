import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import swal from 'sweetalert';
import 'moment/locale/es';
import Global from '../global';
import Sidebar from './Sidebar';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    };

    componentWillMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
            }).catch(err => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            });



    }


    deleteArticle = (id) => {

        swal({
            title: "¿Estás seguro?",
            text: "Una vez borrado el articulo, no podrá recuperarse",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            this.setState({

                                article: res.data.article,
                                status: 'deleted'

                            });


                            swal(
                                'Articulo eliminado',
                                'El articulo ha sido eliminado correctamente',
                                'success'
                            );
                        });
                } else {
                    swal("¡No se ha borrado nada!");
                }
            });
    }

    render() {


        if (this.state.status === 'deleted') {
            return <Redirect to='/Blog' />
        }
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {this.state.article &&
                        <article className=" article-item article-item-detail">
                            <div className="image-wrap">
                                {article.image !== null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                ) : (<img src="https://www.blogdelfotografo.com/wp-content/uploads/2019/03/faro-noche.jpg" alt={article.title} />)
                                }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment fromNow>{article.date}</Moment>
                            </span>

                            <p>{article.content}</p>

                            <button onClick={
                                () => {
                                    this.deleteArticle(article._id)
                                }
                            } className="btn btn-danger">Eliminar</button>

                            <Link to={"/Blog/editar/"+ article._id}  className="btn btn-warning">Editar</Link>
                            <div className="clearfix"></div>
                        </article>
                    }

                    {!this.state.article && this.state.status === "success" &&

                        <div id="article">
                            <h2 className="subheader">El articulo no existe</h2>
                        </div>

                    }
                    {this.state.status == null &&

                        <div id="article">
                            <h2 className="subheader">Cargando...</h2>
                            <p>Espere unos segundos</p>
                        </div>

                    }

                </section>

                <Sidebar />
                <div className="clearfix"></div>
            </div>

        );

    }
}

export default Article;