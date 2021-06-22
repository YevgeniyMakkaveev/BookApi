import React, {Component} from 'react'
import GetBooks from '../services/getBook';
import './modal.css'

export default class Modal extends Component {
 getBook=new GetBooks()
 state ={
  book: null
 }

 
    componentDidUpdate(prevProp){
        if (this.props.seletedBook!== prevProp.seletedBook) {
            this.updateSelected()
        }
    }

    updateSelected() {
     const {
      seletedBook
     } = this.props
     if (!seletedBook) {
      return
     }
     this.getBook.getSingleBook(seletedBook).then((book) => {
      this.setState({book})})
     console.log(this.state.book)
    }

    checkValue(item) {
     if (!item) {
      return "Нет описания"
     } else if (item.value) {
      return item.value
     } else {
      return item
     }
    }

    render() {
      if (!this.state.book) {
       return <span className = "modal-body" > грузка </span>
      }

const { description,covers, title} = this.state.book
let text = this.checkValue(description)
const img = covers[0]
console.log(covers)
 
return(
 <div className="modal-body">
  <h2>{title}</h2>
  < img src = {`http://covers.openlibrary.org/b/id/${img}-M.jpg`}alt='Обложка поломалась'/> 
  <span> {text}
  </span>
 </div>
)
}
}
