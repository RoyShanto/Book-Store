const searchBook = () => {
    const field = document.getElementById('search-field')
    loadBuddies(field.value);
    field.value = '';
}

const loadBuddies = name => {
    document.getElementById('book-container').textContent = ' ';
    document.getElementById('totalResult').textContent = ' ';
    document.getElementById('error-message').textContent = ' ';
    fetch(`https://openlibrary.org/search.json?q=${name}`)
        .then(req => req.json())
        .then(data => displayBook(data.docs));
}

const displayBook = data => {
    if (!data.length) { document.getElementById('error-message').innerText = 'No Result Found'; }
    const allBooks = data;
    allBooks.forEach(book => {
        try {
            let bookName = book.title;
            let bookAuthor = book.author_name[0];
            let bookPublisher = book.publisher[0];
            let bookPublishYear = book.first_publish_year;
            let bookImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            if (book.publisher === undefined) {
                bookPublisher = 'Not Found';
            }
            if (book.author_name === undefined) {
                bookAuthor = 'Not Found';
            }
            if (book.first_publish_year === undefined) {
                bookPublishYear = 'Not Found';
            }
            const allCounntry = document.getElementById('book-container');
            const div = document.createElement('div');
            div.classList.add('book');
            div.innerHTML = `
                <img class="card-img-top" width="200px" height="350px" src="${bookImage}">
                <h4>${bookName}</h4>
                <h6>Author Name: ${bookAuthor}</h6>
                <p>Publisher: ${bookPublisher}</p>
                <p>First Publish Year: ${bookPublishYear}</p>
                `;
            allCounntry.appendChild(div);
        }
        catch (error) {
            console.log('Getting Error', error);
        }
    })
    document.getElementById('totalResult').innerText = `Total Book found: ${data.length}`;
}