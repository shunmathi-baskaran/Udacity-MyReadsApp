import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
import LoadingSpinner from './LoadingSpinner';


//main app component
class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.updateShelf = this.updateShelf.bind(this);
    this.state = {
      books: [],
      loading: false
    }
  }
  bookShelf= [{key:'currentlyReading', name: 'Currently Reading'},
              {key:'wantToRead', name: 'Want to Read'},
              {key:'read', name: 'Read'}];

  //Get All books call
  componentDidMount = () => {
    this.setState({loading:true},()=>{
      BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          books: books,
          loading: false
        }))
      })
    })
  }


  //Update shelf with new books
  updateShelf = (book, newShelfValue) => {
    BooksAPI.update(book, newShelfValue);
    this.setState((prevState) => ({
      books : prevState.books.filter((b)=> b.id !== book.id).concat([book])
      }))
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=> {
          return (this.state.loading) ? <LoadingSpinner /> : <BookShelf 
                    books={this.state.books}
                    bookShelf={this.bookShelf}
                    updateShelf= {this.updateShelf}/>
        }}>
        </Route>
        <Route exact path='/search' render={()=> {
          return <SearchBooks
                  books={this.state.books}
                  updateShelf= {this.updateShelf} />
        }}>
        </Route>
      </div>
    )
  }
}


export default BooksApp
