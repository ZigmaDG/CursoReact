import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';
import 'moment/locale/es';
import axios from 'axios';
import Global from '../global';
class Articles extends Component {

     home = this.props.home;
     search = this.props.search;
    url = Global.url;
    constructor(props){
        super(props);
        this.state = {
            offset: 0,
            articles: [],
            status: null,
            perPage: 5,
            currentPage: 0,
            pageCount: null
        };
        this.handlePageClick = this
        .handlePageClick
        .bind(this);
    }
    

    componentDidMount() {
        
        if (this.home === 'true'){
            this.getLastArticles();

        }else if(this.search && this.search !== null &&this.search !== undefined){
            this.getArticlesBySearch(this.search);
            
        }else{
            this.getArticles();
        }
        
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getArticles()
        });

    };

    getArticles = () => {
        axios.get(this.url + 'articles')
            .then(res => {
                const data = res.data.articles
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    articles: res.data.articles,
                    status: 'success',
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    slice
                });
               
            });
    }

    getLastArticles = () => {
        axios.get(this.url + 'articles/last')
            .then(res => {
                const data = res.data.articles
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    articles: res.data.articles,
                    status: 'success',
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    slice
                });
                console.log(this.state)
            });
    }

    getArticlesBySearch = (searched) => {
        axios.get(this.url + 'search/'+ searched)
            .then(res => {

                    this.setState({
                        articles: res.data.articles,
                        status: 'success'
                    });
                
             
            })
            .catch(err => {
                this.setState({
                    articles:[],
                    status: 'success'
                });
            });
    }

    render() {

        if (this.state.articles.length >= 1) {

        
            var listArticles = this.state.slice.map((article) => {
                return (
                    <article className="article-item" id="article-template" key={article._id} >
                        <div className="image-wrap">
                            {article.image !== null ? (
                                <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                            ) : (<img src="https://www.blogdelfotografo.com/wp-content/uploads/2019/03/faro-noche.jpg" alt={article.title} />)
                            }
                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                          <Moment fromNow>{article.date}</Moment>
                        </span>
                       <Link to={'/Blog/articulo/' + article._id}>Leer más</Link>
                        <div className="clearfix"></div>
                    </article>
                );
            });

            return (
                <div id="articles">
                    {listArticles}
                    {this.home!="true" && 
                    <ReactPaginate
                    previousLabel={"anterior"}
                    nextLabel={"siguiente"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    }
                    
                </div>
            )
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay artículos para mostrar</h2>
                    <p>Todavía no hay articulos en esta sección</p>
                </div>
            )
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras se cargan los artículos</p>
                </div>
            )
        }

    }

}

export default Articles;