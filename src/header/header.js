import React, { Component } from 'react'
import './header.css'


export default class SearchPannel extends Component {

  state = {
    tearm: '',
    isSend: false
  }

  typingTimer = null;


  onImput = (e) => {
    e.preventDefault();
    const tearm = e.target.value;
    this.setState({ tearm });
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      if (tearm) {
        this.onSubmit();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.typingTimer);
  }

  onSubmit = () => {
    const { tearm } = this.state;
    if (tearm !== '') {
      this.props.getSearchRes(tearm)
      this.setState({
        tearm: ''
      })
    }
  }

  render() {
    const { tearm } = this.state;
    return (
      <div className="header">
        < h1 className="title" > КНИЖКА API-ШКА </h1>
        <div className="search-block">
          <input type="text" className="text-field" onChange={this.onImput} value={tearm} />
          <input className="submit-button" type="submit" onClick={this.onSubmit} value="Поиск" />
        </div>
      </div>
    )
  }

}