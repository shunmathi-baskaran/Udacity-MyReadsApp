import React, {Component} from 'react'
import Book from './Book'
import {Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { debounce } from "throttle-debounce"; 
import LoadingSpinner from './LoadingSpinner';


//component for search books
class SearchBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedBooks : [],
      error:false,
      query: '',
      loading: false
    };
    this.searchBookDebounced = debounce(500, this.searchBook);
  }

    searchBook = (value) => {
        if(value !== '') {
          this.setState({loading: true}, () => {
            BooksAPI.search(value).then(data=> {
              if(!data.error) {
                this.setState({
                searchedBooks: data,
                error: false,
                loading: false
              })
              }
              else{
                this.setState({
                  error:true,
                  loading: false
                })
              }
          })
        })
    }
    else {
      this.setState({
        error:true
      })
    }
  }

    render() {
      const searchedBooks = this.state.searchedBooks;
      const books = this.props.books;
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => {
                  this.setState({query: event.target.value}, () => this.searchBookDebounced(this.state.query)) 
                }}/>
              </div>
            </div>
            {(this.state.loading) ? <LoadingSpinner /> :(
                   <div className="search-books-results">
                   {(!this.state.error) ? (
                   <ol className="books-grid">
                         { searchedBooks.map((searchedbook)=> {
                           if(books.find((book)=>book.id===searchedbook.id) !== undefined){
                             let book= books.find((book)=>book.id===searchedbook.id);
                             return <li key={book.id}>
                             <Book book={book}
                                 updateShelf={this.props.updateShelf}/>
                           </li>
                           }else {
                           return <li key={searchedbook.id}>
                             <Book book={searchedbook}
                                 updateShelf={this.props.updateShelf}/>
                           </li>
                           }
                         })
                       }
                   </ol>) : <p>No Search results</p>}
                 </div>
            )}
       
          </div>
        )
    }
}

export default SearchBooks