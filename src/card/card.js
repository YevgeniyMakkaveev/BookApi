import React, { Component } from 'react'
import GetBooks from '../services/getBook'
import './card.css'
import Spinner from '../spinner'
import deafaultImg from '../img/book-template.jpg'


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
    this.getBook.getSearchRes(searchField).then((bookList) => { this.setState({ bookList: bookList.docs }) }
    )
  }
  checkImg(img) {
    if (img) return (`http://covers.openlibrary.org/b/OLID/${img}-M.jpg`)
    else return (deafaultImg)
  }

  renderIt = (arr) => {
    console.log('Идет рендер')
    if (!arr) return (`Ничего не найдено`)
    else
      return (arr.map((item) => {
        const name = item.author_name ? item.author_name.toString() : "Не нашлось"
        const isbn = item.isbn ? item.isbn[(item.isbn.length - 1)] : "Не нашлось"
        const img = this.checkImg(item.cover_edition_key)
        return (<div key={item.key} className="single-card" onClick={() => this.props.getBookId(item.key, name, item.first_publish_year, isbn)}>
          <img className="card-img" src={img} alt='Обложка поломалась' />
          <ul className="content-table">
            <li>
              <span> {`Название книги:  ${item.title}`}</span>
            </li>
            <li>
              <span> {`Имена авторов:  ${name}`} </span>
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