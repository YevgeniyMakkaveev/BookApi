import React, {Component} from 'react'
import GetBooks from '../services/getBook';
import './modal.css'
import Spinner from '../spinner/';
import deafaultImg from '../img/book-template.jpg'

export default class Modal extends Component {
 getBook=new GetBooks()
 state ={
  book: null,
  visible: true
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
     this.setState({visible: true})
     this.getBook.getSingleBook(seletedBook).then((book) => {
      this.setState({book: book})})
     console.log(this.state.book)
    }

    checkValue(item) {
     if (!item) {
      return "Нет описания"
     } else if (item.value) {
      return this.notTooMuch(item.value, 500)
     } else {
      return this.notTooMuch(item, 500)
     }
    }

    checkImg(img){
        if (!img) return (deafaultImg)
        else return(`http://covers.openlibrary.org/b/id/${img[0]}-L.jpg`) 
        
    }
    hideModal =()=>{
        this.setState({visible: false})
        this.props.onHide()
    }
    notTooMuch=(text, limit)=>{
  text = text.trim();
  if( text.length <= limit) return text;

  text = text.slice(0, limit);

  return text.trim() + "...";
}

    render() {
      if (!this.props.seletedBook || !this.state.visible) {
       return null
      } else if(!this.state.book){return  <Spinner/> }

const { description,covers, title} = this.state.book
const{selectedAuthour, selectedYear} = this.props
let text = this.checkValue(description)
const img = this.checkImg(covers)
console.log(covers)
 
return(
    <div className="modal-body" onClick={()=>{this.hideModal()}} >
 <div className="modal-card" >
  <h1>  {title}</h1>
<div className="wrapper">
  < img src = {img} alt='Обложка поломалась' className="modal-img"/>
  <ul><li>
  <span className="bigger-stuff">{`Автор: ${selectedAuthour}`} </span>
  </li>
  <li>
  <span className="bigger-stuff">{`Год публикации: ${selectedYear}`} </span>
  </li>
  </ul>
  </div>
  <span> {text}
  </span>
 </div>
 </div>
)
}
}
