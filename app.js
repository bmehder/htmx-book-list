import express from 'express'
import createHomepageTemplate from './views/index.js'
import createListTemplate from './views/list.js'
import createBookTemplate from './views/book.js'
import createEditFormTemplate from './views/edit.js'
import BOOKS_DATA from './data/data.js'

// create app
const app = express()

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

// route callbacks
const routeHandlers = {
	getHomepage: (_, res) => {
		res.send(createHomepageTemplate())
	},
	getBooks: (_, res) => {
		res.send(createListTemplate(BOOKS_DATA))
	},
	getBook: (req, res) => {
		const { id } = req.params
		const book = BOOKS_DATA.find(book => book.id === id)

		res.send(createBookTemplate(book))
	},
	addBook: (req, res) => {
		const { title, author } = req.body
		const id = crypto.randomUUID()

		BOOKS_DATA.push({ id, title, author })

		res.redirect(`/books/${id}`)
	},
	deleteBook: (req, res) => {
		const { id } = req.params
		const idx = BOOKS_DATA.findIndex(book => book.id === id)

		BOOKS_DATA.splice(idx, 1)

		res.send()
	},
	updateBook: (req, res) => {
		const { id } = req.params
		const { title, author } = req.body

		const updatedBook = { id, title, author }

		const idx = BOOKS_DATA.findIndex(book => book.id === id)

		BOOKS_DATA[idx] = updatedBook

		res.send(createBookTemplate(updatedBook))
	},
	editBook: (req, res) => {
		const book = BOOKS_DATA.find(book => book.id === req.params.id)

		res.send(createEditFormTemplate(book))
	},
	search: (req, res) => {
		const text = req.body.search.toLowerCase()

		const books = BOOKS_DATA.filter(book => book.title.toLowerCase().includes(text))

		res.send(createListTemplate(books))
	},
}

// routes
app.get('/', routeHandlers.getHomepage)

app.get('/books', routeHandlers.getBooks)

app.get('/books/:id', routeHandlers.getBook)

app.post('/books', routeHandlers.addBook)

app.delete('/books/:id', routeHandlers.deleteBook)

app.put('/books/:id', routeHandlers.updateBook)

app.get('/books/edit/:id', routeHandlers.editBook)

app.post('/books/search', routeHandlers.search)

// listen to port
app.listen(3000, () => {
	console.log('App listening on port 3000')
})
