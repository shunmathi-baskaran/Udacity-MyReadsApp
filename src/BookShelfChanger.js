import React, {Component} from 'react'

//component for select option for each book
class BookShelfChanger extends Component {
    onChange =(book,newShelfValue) => {
        book.shelf = newShelfValue;
        this.props.onChangeShelf(book, newShelfValue);
    }

    render() {
        const {book} = this.props;
        return (
        <div className="book-shelf-changer">
            <select onChange= {(event) => this.onChange(book,event.target.value)} value={(book.shelf) ? book.shelf : 'none'} >
            <option value="move" disabled >Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            </select>
        </div>
        )
    }
}


export default BookShelfChanger