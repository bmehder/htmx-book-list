const createHomepageTemplate = () => /*html*/ `
  <!DOCTYPE html>
  <html>
    <head>
      <title>My Reading List</title>
      <link rel="stylesheet" type="text/css" href="/styles.css">
      <script src="https://unpkg.com/htmx.org@2.0.0"></script>
    </head>
  
    <body>
      <header>
        <h1>My Reading List</h1>
      </header>

      <main>
        <div class="search">
          <input
            type="search"
            name="search"
            placeholder="Search books by title..."
            hx-trigger="keyup changed delay:100ms"
            hx-post="/books/search"
            hx-target=".book-list"
          >
        </div>

        <div class="book-list" hx-get="/books" hx-trigger="load"></div>

        <div class="add-book-form">
          <h2>What do you want to read?</h2>
          <form
            hx-post="/books"
            hx-on::after-request="document.querySelector('form').reset()"
            hx-target=".book-list ul"
            hx-swap="beforeend"
          >
            <input type="text" name="title" placeholder="title" required>
            <input type="text" name="author" placeholder="author" required>
            <button>Add Book</button>
          </form>
        </div>
      </main>
    </body>
  </html>
`

export default createHomepageTemplate
