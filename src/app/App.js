import React, { Component } from 'react';
import GetBooks from '../services/getBook';
import './App.css';
import BookCard from '../card';
import SearchPannel from '../header';
import Modal from '../modal/modal';
import ErrorBoundary from '../errorBoundary/errorBoundary';

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
    this.setState({
      selectedId: null,
      selectedAuthour: null,
      selectedYear: null,
      selectedISBN: null,
    })
  }

  getSearchRes = (res) => {
    this.setState({ searchField: res })
  }

  getBookId = (resId, resName, resYear, resISBN) => {
    this.setState({
      selectedId: resId,
      selectedAuthour: resName,
      selectedYear: resYear,
      selectedISBN: resISBN
    })
  }

  render() {
   

    return (
      <div className="App">
        <SearchPannel getSearchRes={this.getSearchRes} />
        <ErrorBoundary>
        <BookCard getBookId={this.getBookId} searchField={this.state.searchField} onError={this.onError}/>

        <Modal seletedBook={this.state.selectedId} selectedAuthour={this.state.selectedAuthour} selectedYear={this.state.selectedYear} selectedISBN={this.state.selectedISBN} onHide={this.hideModal} onError={this.onError}/>
        </ErrorBoundary>
      </div>
      


    );
  }

}

