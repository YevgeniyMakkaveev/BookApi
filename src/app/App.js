import React,{ Component } from 'react';  
import GetBooks from '../services/getBook';
import './App.css';
import Card from '../card/card';
import SearchPannel from '../header';

export default class App extends Component {
  constructor(props){
    super(props)
     this.state={
    booklist: null
  }
  }
  getBook=new GetBooks();
 

componentDidMount = () => {
  if (this.state.booklist == null) {
    this.getBook
      .getLotrApi()
      .then((List) => {
        this.setState({
          booklist: List.docs
        });
      });
    console.log(this.state.booklist);
  }

}

async getTest() {
  const res = await fetch(`https://anapioficeandfire.com/api/characters?page=5`)
  return await res.json()
  //НЕ ЗАБЫВАЙ О ()!
}
 
renderIt =(arr)=>{
return(arr.map((item)=>{
  console.log(item.title)

  return(<div>
   <img src={`http://covers.openlibrary.org/b/OLID/${item.cover_edition_key}-M.jpg`} alt='Обложка поломалась'/> 
   <div className='title'>
   <h3>{item.title}</h3>
   <h3>{item.first_publish_year}</h3>
   </div>
   <div className='overview'>
        
   </div>
 </div>
)
  
}))
}


  render(){
   if(!this.state.booklist){
            return <span className="selector" > Грузимся</span>
        }
    const list= this.state.booklist.slice(0,10)  
    const test = this.renderIt(list)
    
  return (  
      <div>
        <SearchPannel/>
        {test}
      
      </div>
      
   
  );
}

}

