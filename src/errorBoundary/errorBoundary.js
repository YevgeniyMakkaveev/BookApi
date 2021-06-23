import React, { Component } from 'react';

import ErrorMsg from '../error';

export default class ErrorBoundary extends Component {

  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorMsg/>
    }

    return this.props.children;
  }
}