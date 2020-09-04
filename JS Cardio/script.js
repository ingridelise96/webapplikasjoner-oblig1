let main = document.createElement('main');
let body = document.getElementsByTagName('body')[0];
let paragraph = document.createElement('p');
let select = document.createElement('select');
let testBtn = document.createElement('button');
let resetBtn = document.createElement('button');

window.onload = (event) => {
    createMain();
    createParagraph();
    createSelect();
    createButtons();
    createList();
}

createMain = () => {
    main.style.display = 'grid';
    main.style.gridTemplateRows = '1fr 1fr 1fr 3fr';
    main.style.padding = '100px';
    main.style.placeContent = 'center';
    main.style.gridGap = '15px';
    body.appendChild(main);
}

createParagraph = () => {
    paragraph.innerHTML = 'Jeg trener på JavaScript';
    paragraph.className = 'p1';
    paragraph.style.gridColumn = '1 / span 2';
    main.appendChild(paragraph);
}

createSelect = () => {
    const selectArray = [
        {id: 'osl', name: 'Oslo'}, 
        {id: 'trd', name: 'Trondheim'}, 
        {id: 'stv', name: 'Stavanger'}, 
        {id: 'brg', name: 'Bergen'}, 
        {id: 'hld', name: 'Halden'},
        {id: 'trm', name: 'Tromsø'}
    ];


    selectArray.forEach(town => {
        let option = document.createElement('option');
        option.value = town.id;
        option.innerHTML = town.name;
        select.appendChild(option);
    });

    select.style.maxWidth = '500px';
    select.style.gridColumn = '1 / span 2';
    
    main.appendChild(select);
}

createButtons = () => {
    testBtn.value = 'test';
    testBtn.id = 'testBtn';
    testBtn.innerHTML = 'Test';
    testBtn.style.gridColumn = '1 / span 1';

    resetBtn.value = 'reset';
    resetBtn.id = 'resetBtn';
    resetBtn.innerHTML = 'Reset';
    resetBtn.style.gridColumn = '2 / span 1';

    main.appendChild(testBtn);
    main.appendChild(resetBtn);

    let clickedTestBtn = document.getElementById('testBtn');
    clickedTestBtn.addEventListener('click', addNewParagraph);

    let clickedResetBtn = document.getElementById('resetBtn');
    clickedResetBtn.addEventListener('click', createListElements);
}

function addNewParagraph() {
    console.log('clicked');

    let newText = [];
    let oldText = document.getElementsByClassName('p1')[0];
    let oldTextValue = oldText.textContent;

    for (let i = 0; i < oldTextValue.length; i++) {
        if((oldTextValue[i-1] !== " ") && (i !== 0)) {
            newText.unshift(oldTextValue[i]);
        }
    }

    oldText.innerHTML = newText.join('');
}

let newList = document.createElement('ul');

createList = () => {
    newList.id = 'list';
    newList.style.gridColumn = '1 / span 2';
    main.appendChild(newList);

    createListElements();

    let deleteBtns = document.querySelectorAll('.delete');

    deleteBtns.forEach(element => {
        element.addEventListener('click', deleteListElement)
    });
}

function deleteListElement() {
    this.parentNode.remove();
}

function createListElements() {
    for (let i = 0; i < 4; i++) {

        let newListElement = document.createElement('li');
        newListElement.style.margin = '0 15px 15px 0';
        newListElement.innerHTML = 'Element' + i;
        newList.appendChild(newListElement);
    
        let deleteBtn = document.createElement('button');
        deleteBtn.value = 'delete';
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.className = 'delete';
        newListElement.appendChild(deleteBtn);
        deleteBtn.style.marginLeft = '15px';
    }
}
