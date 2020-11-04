import React, {Component} from 'react'
import Book from './Book'
import {Link}  from 'react-router-dom'

class BookShelf extends Component {
    render() {
        const { books, bookShelf } = this.props;
              
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  {bookShelf.map((bookShelf) => (
                       <div className="bookshelf" key={bookShelf.key}>
                        <h2 className="bookshelf-title">{bookShelf.name}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.filter((book) => (
                                    book.shelf === bookShelf.key
                                )).map((filteredBook) => {
                                    return <li key={filteredBook.id}>
                                     <Book book = {filteredBook} 
                                           updateShelf = {this.props.updateShelf}/>
                                    </li>
                                })}
                            </ol>
                        </div>
                       </div>
                  ))}
              </div>
            </div>
            <div className="open-search">
                <Link to='/search'>
                  <button>Add a book</button>
                </Link>
            </div>
          </div>
        )
    }
}

export default BookShelf