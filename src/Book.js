import React, {Component} from 'react'
import BookShelfChanger from './BookShelfChanger'

//component for individual book
class Book extends Component {

    render() {
        const book = this.props.book;
        return (
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={(book.imageLinks === undefined) ? {width: 128, height: 193, backgroundImage: 'none'} : { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <BookShelfChanger book={book} onChangeShelf = {this.props.updateShelf} />
            </div>
            <div className="book-title">{(book.title) ? book.title : ''}</div>
            <div className="book-authors">{(book.authors) ? book.authors.join(', ') : ''}</div>
         </div>
        )
    }
}


export default Book