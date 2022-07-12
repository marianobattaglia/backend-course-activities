class User {
    constructor(name, secondName, books, pets) {
        this.name = name
        this.secondName = secondName
        this.books = books
        this.pets = pets
    }

    // Returns user's full name
    getFullName() {
        return this.name + " " + this.secondName
    }

    // Add a new pet to "pets" Array
    addMascota(pet) {
       return this.pets.push(pet)
    }

    // Return user's pets quantity
    countMascotas() {
        return this.pets.length;
    }

    //Add a new Book { name: String, author: String }
    addBook(bookName, bookAuthor) {
        let newAppend = { name: bookName, author: bookAuthor}
        this.books.push(newAppend)
    }
}

// Initialization of a new person
let persona = new User("Mariano", "Battaglia", [{name: "Lord of the Rings", author: "J.R.R. Tolkien"}], ["Peter", "Cloe"])
console.log(persona); // Console prints user persona

// User's full name
let personaFullName = persona.getFullName()
console.log(personaFullName); // Console: Mariano Battaglia

// Add pets to "pets" Array
persona.addMascota("Cachorro");
console.log(persona.pets); // Console: [ 'Peter', 'Cloe', 'Cachorro' ]

// Return user's pets quantity 
let petQuantity = persona.countMascotas()
console.log(petQuantity); // Console: 3

// Add a new book
console.log(persona.books); // For demostration, print the initialization persona.books: [ { name: 'Lord of the Rings', author: 'J.R.R. Tolkien' } ]
persona.addBook("Harry Potter", "J.K.Rowling") // Append a new book in Array
console.log(persona.books); // Console: [ { name: 'Lord of the Rings', author: 'J.R.R. Tolkien' }, { name: 'Harry Potter', author: 'J.K.Rowling' } ]
