import createBookTemplate from '../views/book.js'

const createListTemplate = books => /*html*/ `
  <ul>
    ${books.map(createBookTemplate).join('')}
  </ul>
`

export default createListTemplate
