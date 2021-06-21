import React,{ Component } from 'react';  
import GetBooks from '../services/getBook';
import './App.css';
import BookCard from '../card';
import SearchPannel from '../header';
import Modal from '../modal/modal';

export default class App extends Component {
  constructor(props){
    super(props)
     this.state={
   data:[],
   searchField: '',
   selectedId: null,
   showModal: false,
   error: false
  }
  this.showModal=this.showModal.bind(this)
  this.hideModal=this.hideModal.bind(this)
  this.getSearchRes=this.getSearchRes.bind(this)
  this.getBookId=this.getBookId.bind(this)
  }
  getBook=new GetBooks();
 

  showModal =()=>{
    this.setState({showModal: true})
  }
  hideModal =()=>{
    this.setState({showModal: false})
  }

  getSearchRes=(res)=> {
    this.setState({searchField: res})
    console.log(this.state)
  }

getBookId=(res)=>{
  this.setState({
        selectedId: res  })
      console.log(this.state)}



  render(){
 const{showModal}=this.state
 const renderModal =showModal? <Modal/>:null
    
  return (  
      <div>
        <SearchPannel  getSearchRes={this.getSearchRes} />
        <button onClick={this.showModal}> Покажись, модальное</button>
        <button onClick={this.hideModal}> Спрячься, модальное</button>
        <BookCard getBookId={this.getBookId}/>
        {renderModal}
      
      </div>
      
   
  );
}

}

