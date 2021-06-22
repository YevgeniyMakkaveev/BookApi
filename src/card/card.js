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




renderIt =(arr)=>{
  console.log('Идет рендер')
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
)}))}


render(){
 if (!this.state.bookList) {
            return <span className="selector" > Начните поиск</span>
        }
    const list = this.state.bookList   
    const test = this.renderIt(list)
 return(
<div className="cards-nest">
 {test}
</div>
 )
}
}