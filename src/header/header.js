import React, { Component } from 'react'

export default class SearchPannel extends Component {

  
      state = {
      tearm: ''
    }


onSearch =(e)=>{
  e.preventDefault()
  const tearm = e.target.value;
  console.log(tearm)
  this.props.getSearchRes(tearm)
}
 

render() {
 return(
<div>
  <form 
  onSubmit={this.onSearch}>
 <input 
  type ='text'
  placeholder = 'Поиск'
  
  onChange={this.onSearch}
  
 
  />
<button>Тестовая кнопка</button>
 </form>
</div>
  )
}

} 