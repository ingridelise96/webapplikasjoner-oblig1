// -----------ARRAYS TO STORE TODOS---------
// array to store active todos
let todoObjects = [
    {title: "Get eggs", 
    description: "Buy pack of 12 eggs from Rema 1000.", 
    author: "Ingrid E. Dahl"},
    {title: "Start assignment 3", 
    description: "Start assignment 3 in webapplications.", 
    author: "Ingrid E. Dahl"},
    {title: "Don't drop out", 
    description: "This is your last year, you can do it...probably.",
    author: "Ingrid E. Dahl"}
];

// creates date objects for initial test-todos
testDate1 = new Date();
testDate1.setFullYear(2020, 8, 4);

testDate2 = new Date();
testDate2.setFullYear(2020, 5, 25);

testDate3 = new Date();
testDate3.setFullYear(2020, 6, 17);

// array to store completed todos
let completedTodoObjects = [
    {title: "Hand in assignment 2", 
    author: "Ingrid E. Dahl",
    description: "Finish assignment 2 in webapplications.", 
    date: testDate1},
    {title: "Get dinners", 
    author: "Ingrid E. Dahl",
    description: "Buy dinners for this week at Rema 1000.", 
    date: testDate2},
    {title: "Pick up parcel", 
    author: "Ingrid E. Dahl",
    description: "Pick up parcel at post office.", 
    date: testDate3,}
];

// ----------INTERACTIVE ELEMENTS FROM DOM---------
let newTodoModal = document.querySelectorAll('.modalOverlay')[0];
let newTodoBtn = document.querySelector('#newTodoBtn');
let closeModalIcon = document.querySelectorAll('.iconClose')[0];
let createTodoForm = document.querySelectorAll('.modalForm')[0];
let descriptionTxt = document.querySelector('#description');
let todoCards = document.querySelectorAll('.todoCards')[0];
let card = document.querySelectorAll('.card');
let filterNewChk = document.querySelector('#filterNew');
let filterOldChk = document.querySelector('#filterOld');

// -----------EVENTLISTENERS--------------
window.onload = (event) => {
    fillCards();
    fillTable();
}

newTodoBtn.addEventListener('click', event => {
    openModal();
});

closeModalIcon.addEventListener('click', event => {
    closeModal();
});

newTodoModal.addEventListener('click', event => {
    // checks if click is outside of modal form box
    if(event.target.className == 'modalOverlay') {
        closeModal();
    }
});

createTodoForm.addEventListener('submit', event => {
    createTodo();
});

todoCards.addEventListener('click', event => {
    /* listens to click on entire todoCards section to pick up 
    clicks on either 'delete' or 'complete' */
    removeTodoFromCard(event);
});

descriptionTxt.addEventListener('keyup', event => {
    charCounter();
});

filterNewChk.addEventListener('click', event => {
    sortByNew();
});

filterOldChk.addEventListener('click', event => {
    sortByOld();
});

// --------------FUNCTIONS----------------
openModal = () => {
    let titleTxt = document.querySelector('#title');
    let authorTxt = document.querySelector('#author');

    titleTxt.value = '';
    descriptionTxt.value = '';
    authorTxt.value = '';

    newTodoModal.style.display = 'block';
    document.querySelector('#title').focus();
}

closeModal = () => {
    newTodoModal.style.display = 'none';
}

createTodo = () => {
    let newTodoTitle = document.querySelector('#title').value;
    let newTodoDescription = document.querySelector('#description').value;
    let newTodoAuthor = document.querySelector('#author').value;

    // creates new todo-object with values from modal form
    const cardObject = {title: newTodoTitle, description: newTodoDescription, author: newTodoAuthor};

    // adds new todo-object to front of todoObjects array
    todoObjects.unshift(cardObject);

    fillCards();
    closeModal();
}

removeTodoFromCard = event => {
    let parentCard = event.target.parentElement;
    let cardTitle = parentCard.children[0].textContent;
    let cardDescription = parentCard.children[1].textContent;

    for (const i in todoObjects) {

        // finds todo in todoObjects array
        if(todoObjects[i].title == cardTitle && todoObjects[i].description == cardDescription) {

            let buttonClicked = event.target.className;
            
            if(buttonClicked == 'completeTodo' || buttonClicked == 'deleteTodo') {
                if(buttonClicked == 'completeTodo') {
                    addToCompleted(todoObjects[i]);
                }
                todoObjects.splice(i, 1); // removes todo-object from array of active todos
                fillCards();
            }
        }
    }
}

addToCompleted = compTodoObject => {
    let compDate = new Date();

    // creates new object for completed todo
    completedTodo = {
        title: compTodoObject.title,
        author: compTodoObject.author,
        description: compTodoObject.description,
        date: compDate
    };

    // adds object to front of array for completed todos
    completedTodoObjects.unshift(completedTodo);
    fillTable();
}

fillCards = () => {
    // gets the three first todos from todo-array
    let lastAddedTodos = todoObjects.slice(0,3);

    // fills in HTML cards with data from array
    for (const i in lastAddedTodos) {
        card[i].children[0].textContent = todoObjects[i].title;
        card[i].children[1].textContent = todoObjects[i].description;
    }
}

fillTable = () => {
    // gets the three first todos from completed-todo-array
    let displayTodos = completedTodoObjects.slice(0,3);
    let tableRows = document.querySelectorAll('.tableRow');

    // fills inn HTML table with data from array and adds formatted date
    for (const i in displayTodos) {
        tableRows[i].children[0].firstChild.textContent = displayTodos[i].title;
        tableRows[i].children[1].firstChild.textContent = displayTodos[i].author;
        tableRows[i].children[2].firstChild.textContent = displayTodos[i].description;

        let formatDate = getDate(displayTodos[i].date);

        tableRows[i].children[3].firstChild.textContent = formatDate;
    }
}

// formats the date object to string
getDate = date => {
    let shortYear = date.getFullYear().toString().substr(2, 2);
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1 ).toString();
    let compDate = day + "." + month + "." + shortYear;

    return compDate;
}

// counts used/remaining characters in description text field
charCounter = () => {
    let textValue = descriptionTxt.value.toString();
    let showAvail = document.querySelector('#availChars');
    let charsLeft = (30 - textValue.length);

    showAvail.textContent = "Remaining characters: " + charsLeft;
}

// sorts completed todo array by newest dates
sortByNew = () => {
    completedTodoObjects.sort((a, b) => b.date - a.date);
    fillTable();
    document.querySelector('#filterOld').checked = false;
}

// sorts completed todo array by oldest dates
sortByOld = () => {
    completedTodoObjects.sort((a, b) => a.date - b.date);
    fillTable();
    document.querySelector('#filterNew').checked = false;
}