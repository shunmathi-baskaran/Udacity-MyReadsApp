import React from 'react'
import BookShelfChanger from './BookShelfChanger'

// stateless functional component for individual book
function Book(props) {
        const book = props.book;
        return (
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={(book.imageLinks === undefined) ? {width: 128, height: 193, backgroundImage: 'none'} : { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <BookShelfChanger book={book} onChangeShelf = {props.updateShelf} />
            </div>
            <div className="book-title">{(book.title) ? book.title : ''}</div>
            <div className="book-authors">{(book.authors) ? book.authors.join(', ') : 'Author Unknown'}</div>
         </div>
        )
    }

export default Book