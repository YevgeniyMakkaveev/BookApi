import React, {Component} from 'react'
import GetBooks from '../services/getBook'
import './card.css'


export default class BookCard extends Component {

 getBook= new GetBooks()

 state = {
  bookList: null
 }

    



componentDidMount = () => {
 if (this.state.bookList == null) {
  this.getBook
   .getLotrApi()
   .then((List) => {
    this.setState({
     bookList: List.docs
    });});
  
 }}

renderIt =(arr)=>{
return(arr.map((item)=>{
  

  return(<div key={item.key} className="single-card" onClick={()=>this.props.getBookId(item.key)}>
   <img src={`http://covers.openlibrary.org/b/OLID/${item.cover_edition_key}-M.jpg`} alt='Обложка поломалась'/> 
   <div className='title'>
   <h3>{item.title}</h3>
   <h3>{item.first_publish_year}</h3>
   </div>
   <div className='overview'>
        
   </div>
 </div>
)
}))}


render(){
 if (!this.state.bookList) {
            return <span className="selector" > Грузимся</span>
        }
    const list = this.state.bookList.slice(0, 10)
    const test = this.renderIt(list)
 return(
<div className="cards-nest">
 {test}
</div>
 )
}
}