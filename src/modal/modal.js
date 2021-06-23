import React, { Component } from 'react'
import GetBooks from '../services/getBook';
import './modal.css'
import Spinner from '../spinner/';
import deafaultImg from '../img/book-template.png'

export default class Modal extends Component {
    getBook = new GetBooks()
    state = {
        book: null,
        visible: false,

    }


    componentDidUpdate(prevProp) {
        if (this.props.seletedBook !== prevProp.seletedBook) {
            this.updateSelected()
        }
    }


    updateSelected() {
        const {
            seletedBook
        } = this.props
        if (!seletedBook) {
            return
        }
        this.setState({ visible: true })
        this.getBook.getSingleBook(seletedBook).then((book) => {
            this.setState({ book: book, loading: false })
        })
    }

    checkValue(item) {
        if (!item) {
            return "Нет описания"
        } else if (item.value) {
            return item.value
        } else {
            return item
        }
    }

    checkImg(img) {
        if (!img) return (deafaultImg)
        else return (`http://covers.openlibrary.org/b/id/${img[0]}-L.jpg`)

    }
    hideModal = () => {
        this.setState({ visible: false, book: null })
        this.props.onHide()
    }


    render() {
        if (!this.props.seletedBook || !this.state.visible) {
            return null
        } else if (!this.state.book) { return <Spinner /> }

        const { description, covers, title } = this.state.book
        const { selectedAuthour, selectedYear, selectedISBN } = this.props
        let text = this.checkValue(description)
        const img = this.checkImg(covers)
       
        return (
            <div className="modal-body" onClick={() => { this.hideModal() }} >
                <div className="modal-card" >
                    <h1>  {title}</h1>
                    <div className="wrapper">
                        < img src={img} alt='Обложка поломалась' className="modal-img" />
                        <ul><li>
                            <span className="bigger-stuff">{`Автор: ${selectedAuthour}`} </span>
                        </li>
                            <li>
                                <span className="bigger-stuff">{`Год публикации: ${selectedYear}`} </span>
                            </li>
                            <li>
                                <span className="bigger-stuff">{`ISBN: ${selectedISBN}`}</span>
                            </li>
                        </ul>
                    </div>
                    <span> {text}
                    </span>
                </div>
            </div>
        )
    }
}
