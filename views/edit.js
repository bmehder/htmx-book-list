const createEditFormTemplate = book => /*html*/ `
  <form hx-put="/books/${book.id}" hx-target="closest li" hx-swap="outerHTML">
    <input
      type="text"
      name="title"
      placeholder="title"
      value="${book.title}"
      required
    >
    <input
      type="text"
      name="author"
      placeholder="author"
      value="${book.author}"
      required
    >
    <button>Edit Book</button>
  </form>
`
export default createEditFormTemplate
