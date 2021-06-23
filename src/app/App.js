import React, { Component } from 'react';
import GetBooks from '../services/getBook';
import './App.css';
import BookCard from '../card';
import SearchPannel from '../header';
import Modal from '../modal/modal';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

      searchField: '',
      selectedId: null,
      selectedAuthour: null,
      selectedYear: null,
      selectedISBN: null,
      error: false
    }
    this.hideModal = this.hideModal.bind(this)
    this.getSearchRes = this.getSearchRes.bind(this)
    this.getBookId = this.getBookId.bind(this)
  }
  getBook = new GetBooks();



  hideModal = () => {
    this.setState({ selectedId: null })
    console.log(() => this.state)
  }

  getSearchRes = (res) => {
    this.setState({ searchField: res })
    console.log('обновлен поиск')
  }

  getBookId = (resId, resName, resYear, resISBN) => {
    this.setState({
      selectedId: resId,
      selectedAuthour: resName,
      selectedYear: resYear,
      selectedISBN: resISBN
    })
    console.log('получено id книги')
  }



  render() {



    return (
      <div className="App">
        <SearchPannel getSearchRes={this.getSearchRes} />
        <BookCard getBookId={this.getBookId} searchField={this.state.searchField} />

        <Modal seletedBook={this.state.selectedId} selectedAuthour={this.state.selectedAuthour} selectedYear={this.state.selectedYear} selectedISBN={this.state.selectedISBN} onHide={this.hideModal} />
      </div>


    );
  }

}

