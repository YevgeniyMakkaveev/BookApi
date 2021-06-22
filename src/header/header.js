import React, { Component } from 'react'
import './header.css'


export default class SearchPannel extends Component {

  
      state = {
      tearm: ''
    }
 
onImput = (e)=>{
e.preventDefault();
const tearm = e.target.value;
this.setState({
  tearm
});
//тут с таймаута зовем сабмит
}

  onSubmit = () => {
     const { tearm } = this.state;
     this.props.getSearchRes(tearm)
     this.setState({
       tearm: ''
     })
   }

render() {
  const {tearm} = this.state;
 return(
           <div className="header">
             < h1 className = "title" > КНИЖКА API-ШКА </h1>
                            <div className="search-block">
               <input  type="text" className="text-field" onChange={this.onImput} value={tearm}/>
               <input className="submit-button" type="submit" onClick={this.onSubmit} value="Искать книги"/>
               </div>
           </div>
  )
}

} 