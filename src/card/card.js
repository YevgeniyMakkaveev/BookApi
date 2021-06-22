import React, {Component} from 'react'
import GetBooks from '../services/getBook'
import './card.css'


export default class BookCard extends Component {

 getBook= new GetBooks()

 state = {
  bookList: null
 }

   

    componentDidUpdate(prevProp){
        if(this.props.searchField!== prevProp.searchField){
            this.updateBook()
        }
    }

    updateBook(){
       const {searchField}=this.props
       if(!searchField){return}
           this.getBook.getSearchRes(searchField).then((bookList)=>{this.setState({bookList: bookList.docs})}
           )}

  renderIt = (arr) => {
    console.log('Идет рендер')
    return (arr.map((item) => {
      const name = item.author_name.toString() ? item.author_name.join() : "Не нашлось"
      return (<div key={item.key} className="single-card" onClick={() => this.props.getBookId(item.key, name, item.first_publish_year)}>
        <img className="card-img" src={`http://covers.openlibrary.org/b/OLID/${item.cover_edition_key}-M.jpg`} alt='Обложка поломалась' />
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
)}))}


render(){
 if (!this.props.searchField) {
            return  <span className="selector" > Начните поиск</span>
        } else if (!this.state.bookList){return <span className="selector" > Идет загрузка</span>}
    const list = this.state.bookList   
    const test = this.renderIt(list)
 return(
<div className="cards-nest">
 {test}
</div>
 )
}
}