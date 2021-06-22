import React,{ Component} from 'react';  
import GetBooks from '../services/getBook';
import './App.css';
import BookCard from '../card';
import SearchPannel from '../header';
import Modal from '../modal/modal';

export default class App extends Component {
  constructor(props){
    super(props)
     this.state={
   
   searchField: '',
   selectedId: null,
   showModal: false,
   selectedAuthour: null,
   selectedYear: null,
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
    console.log('обновлен поиск')
  }

getBookId=(resId, resName, resYear)=>{
  this.setState({
        selectedId: resId,
        selectedAuthour: resName,
        selectedYear: resYear})
      console.log('получено id книги')}



  render(){
//  const{showModal}=this.state
//  const renderModal =showModal? <Modal/>:null
    
  return (  
      <div className="App">
        <SearchPannel  getSearchRes={this.getSearchRes} /> 
        <BookCard getBookId={this.getBookId} searchField={this.state.searchField}/>
        <Modal seletedBook={this.state.selectedId} selectedAuthour={this.state.selectedAuthour} selectedYear={this.state.selectedYear}/>
      
      </div>
      
   
  );
}

}

