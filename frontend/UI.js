import BookService from './services/BookService'
import {format} from 'timeago.js'

const bookService = new BookService();

class UI {
    async renderBooks() {
        const books = await bookService.getBooks()
        const booksCardContainer = document.getElementById('books-cards')

        booksCardContainer.innerHTML = ''
        books.forEach(book => {
            const div = document.createElement('div')
            div.className = ''
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${book.imagePath}" alt="" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-card delete" _id="${book._id}">Delete</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            
            `
            booksCardContainer.appendChild(div)
        })
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div')
        div.className = `alert alert-${colorMessage} message`

        div.appendChild(document.createTextNode(message))

        const container = document.querySelector('#card-container')
        const bookForm = document.querySelector('#book-form')

        container.insertBefore(div, bookForm)
        setTimeout(() => {
            document.querySelector('.message').remove()
        }, secondsToRemove)

    }

    async addNewBook(book) {
        await bookService.postBook(book);
        this.clearBookForm()
        this.renderBooks()
    }

    clearBookForm() {
        document.getElementById('book-form').reset();
    }

    async deleteBook(bookId) {
        await bookService.deleteBook(bookId)
        this.renderBooks()
    }
}

export default UI;
