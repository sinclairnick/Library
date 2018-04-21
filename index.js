const library = document.querySelector('#library');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

let lib = []; //empty array for books

Book.prototype.addBook = function () {
    lib.push(this);
    displayBooks(); //refresh books on display each time a book is added
}





function displayBooks() {
    library.innerHTML = ""; //clear the library first

    lib.forEach((book, index) => { //render each book again
        let checked;
        if(book.read == true){
        checked = "checked"; //if book has been read, check the box
        }else{
        checked = "";
        }

        library.innerHTML += `
    <tr>
    <td>${book.title}</td>
    <td name="author">${book.author}</td>
    <td name="pages">${book.pages} pages</td>
    <td><input type="button" class="read not-read" name="${index}"/></td>
    <td><input type="button" class="remove" name="${index}"/></td>
    </tr>`
    });

    const readButtons = document.querySelectorAll('.read');
    readButtons.forEach(button => button.addEventListener('click', toggleRead));
    
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => button.addEventListener('click', removeBook));

}


function toggleRead(){
    lib[this.name].read = !lib[this.name].read;
    this.classList.toggle('not-read');
}

function removeBook(){
    lib.splice(this.name, 1);
    displayBooks();
}

function getForm(e) {       //gets the form information, creates a book, and sets form to 0
    if (e.key == 'Enter') {
        const bookForm = document.forms.bookForm;
        const title = bookForm.title.value;
        const author = bookForm.author.value;
        const pages = bookForm.pages.value;
        if (title  && author && pages) {
            new Book(title, author, pages, false).addBook(); //new book with form info and add it to library
            bookForm.title.value = "";
            bookForm.author.value = "";
            bookForm.pages.value = "";
            bookForm.title.focus();
        } else if(bookForm.title.value == ""){
            bookForm.title.focus();
        } else if(bookForm.author.value == ""){
            bookForm.author.focus();
        } else if(bookForm.pages.value == ""){
            bookForm.pages.focus();
        } else{
            alert('Please enter valid book details'); //fallback error
        }
    }

}


//inputs always stay the same, so dont need to constantly refresh <inputTexts>
const inputTexts = document.querySelectorAll('input[type=text]');

inputTexts.forEach(input => input.addEventListener('keyup', (e) => {
    getForm(e);
}));