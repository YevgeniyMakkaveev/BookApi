import React, { Component } from 'react'
import GetBooks from '../services/getBook'
import './card.css'
import Spinner from '../spinner'
import deafaultImg from '../img/book-template.png'


export default class BookCard extends Component {

  getBook = new GetBooks()

  state = {
    bookList: null
  }



  componentDidUpdate(prevProp) {
    if (this.props.searchField !== prevProp.searchField) {
      this.updateBook()
    }
  }

  updateBook() {
    const { searchField } = this.props
    if (!searchField) { return }
    this.setState({ bookList: null })
    this.getBook.getSearchRes(searchField).then((bookList) => { this.setState({ bookList: bookList.docs }) }
    )
  }
  checkImg(img) {
    if (img) return (`http://covers.openlibrary.org/b/OLID/${img}-M.jpg`)
    else return (deafaultImg)
  }

  notTooMuch = (text, limit) => {
    text = text.trim();
    if (text.length <= limit) return text;

    text = text.slice(0, limit);

    return text.trim() + "...";
  }
  renderIt = (arr) => {
    if (!arr) return (`Ничего не найдено`)
    else
      return (arr.map((item) => {
        const shownTitle = this.notTooMuch(item.title, 20)
        const originalName = item.author_name ? item.author_name.toString() : "Не нашлось"
        const shownName = this.notTooMuch(originalName, 20)
        const isbn = item.isbn ? item.isbn[(item.isbn.length - 1)] : "Не нашлось"
        const img = this.checkImg(item.cover_edition_key)
        return (<div key={item.key} className="single-card" onClick={() => this.props.getBookId(item.key, originalName, item.first_publish_year, isbn)}>
          <img className="card-img" src={img} alt='Обложка поломалась' />
          <ul className="content-table">
            <li>
              <span> {`Название книги:  ${shownTitle}`}</span>
            </li>
            <li>
              <span> {`Имена авторов:  ${shownName}`} </span>
            </li>
            <li>
              <span> {`Год издания: ${item.first_publish_year}`} </span>
            </li>
          </ul>
        </div>
        )
      }))
  }


  render() {

    if (!this.props.searchField) {
      return null
    } else if (!this.state.bookList) { return <Spinner /> }
    const list = this.state.bookList
    const test = this.renderIt(list)
    return (
      <div className="cards-nest">
        {test}
      </div>
    )
  }
}