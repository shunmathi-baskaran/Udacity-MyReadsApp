import React, {Component} from 'react'
import Book from './Book'
import {Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


//component for search books
class SearchBooks extends Component {
    state = {
      searchedBooks : [],
      error:false
    }

    searchBook = (value) => {
        if(value !== '') {
        BooksAPI.search(value).then(data=> {
          if(!data.error) {
            this.setState({
            searchedBooks: data,
            error:false
          })
          }
          else{
            this.setState({
              error:true
            })
          }
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
                <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchBook(event.target.value)}/>
              </div>
            </div>
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
          </div>
        )
    }
}

export default SearchBooks