const main = document.createElement('main');
const newList = document.createElement('ul');

const townsArray = [
    {id: 'osl', name: 'Oslo'}, 
    {id: 'brg', name: 'Bergen'},
    {id: 'trd', name: 'Trondheim'}, 
    {id: 'stv', name: 'Stavanger'}
];

window.onload = (event) => {
    createMain();
}

createMain = () => {
    const body = document.querySelectorAll('body')[0];

    main.style.cssText = 'display: grid; grid-template-rows: 50px 30px 35px 200px; grid-template-columns: 10% 10%; padding: 100px; place-content: center; grid-gap: 15px; font-family: Arial';
    body.appendChild(main);

    createParagraph();
    createSelect();
    createButtons();
    createList();
}

createParagraph = () => {
    const paragraph = document.createElement('p');

    paragraph.innerHTML = 'Jeg trener på JavaScript';
    paragraph.className = 'p1';
    paragraph.style.cssText = 'grid-column: 1 / span 2; text-align: center; font-size: 18px';
    main.appendChild(paragraph);
}

createSelect = () => {
    const select = document.createElement('select');

    townsArray.forEach(town => {
        let option = document.createElement('option');
        option.value = town.id;
        option.innerHTML = town.name;
        select.appendChild(option);
    });

    select.style.cssText = 'max-width: 500px; grid-column: 1 / span 2; border-radius: 5px';
    main.appendChild(select);
}

createButtons = () => {
    const testBtn = document.createElement('button');
    const resetBtn = document.createElement('button');

    testBtn.value = 'test';
    testBtn.id = 'testBtn';
    testBtn.innerHTML = 'Test';
    testBtn.style.cssText = 'grid-column: 1 / span 1; background-color: #59405c; color: white; border: none; border-radius: 5px';

    resetBtn.value = 'reset';
    resetBtn.id = 'resetBtn';
    resetBtn.innerHTML = 'Reset';
    resetBtn.style.cssText = 'grid-column: 2 / span 1; background-color: #4b5d67; color: white; border: none; border-radius: 5px'

    main.appendChild(testBtn);
    main.appendChild(resetBtn);

    let clickedTestBtn = document.querySelector('#testBtn');
    clickedTestBtn.addEventListener('click', updateParagraph);

    let clickedResetBtn = document.querySelector('#resetBtn');
    clickedResetBtn.addEventListener('click', resetListElements);
}

function updateParagraph() {
    console.log('clicked');

    let newText = [];
    let oldText = document.querySelectorAll('.p1')[0];
    let oldTextValue = oldText.textContent;

    for (let i = 0; i < oldTextValue.length; i++) {
        if((oldTextValue[i-1] !== " ") && (i !== 0)) {
            newText.unshift(oldTextValue[i]);
        }
    }

    oldText.innerHTML = newText.join('');
}

createList = () => {
    newList.id = 'list';
    newList.style.cssText = 'grid-column: 1 / span 2; padding-left: 10px; list-style-position: inside';
    main.appendChild(newList);

    createListElements();
}

function createListElements() {
    townsArray.forEach(town => {
        let newListElement = document.createElement('li');
        newListElement.style.margin = '0 15px 20px 0';
        newListElement.innerHTML = town.name;
        newList.appendChild(newListElement);

        let deleteBtn = document.createElement('button');
        deleteBtn.value = 'delete';
        deleteBtn.innerHTML = 'X';
        deleteBtn.className = 'delete';
        newListElement.appendChild(deleteBtn);
        deleteBtn.style.cssText = 'margin-left: 15px; float: right; background-color: #87556f; color: white; border: none; padding: 4px 7px 4px 7px; font-size: 11px; font-weight: bold; border-radius: 11px';
    });

    let deleteBtns = document.querySelectorAll('.delete');

    deleteBtns.forEach(element => {
        element.addEventListener('click', deleteListElement)
    });
}

function deleteListElement() {
    this.parentNode.remove();
}

function resetListElements() {
    newList.innerHTML = '';
    createListElements();
}
