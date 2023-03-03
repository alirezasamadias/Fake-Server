// START
const formEl = document.querySelector('.form');
const textEl = document.querySelector('.input_text');
const checkboxEl = document.querySelector('.checkbox input');
const selectOptionEl = document.querySelector('.select');
const ulEl = document.querySelector('.todolist');

const todosUrl = 'http://localhost:3000/todos';

// post
formEl.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const todoTitle = textEl.value.trim();
    const isCompleted = checkboxEl.checked;
    const selectOptionData = selectOptionEl.value;

    const todoData = {
        title : todoTitle,
        isCompleted : isCompleted,
        writer: selectOptionData
    };

    await fetch(todosUrl , {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(todoData)
    });
});

// get
async function getTodos(){
    const response = await fetch(todosUrl);
    const todos = await response.json();
    let template = '';

    for (const todo of todos) {
        const {title , isCompleted , writer , id} = todo
        template += `<li data-id='${id}' class='${isCompleted ? 'complete' : 'not-complete'}'>
                <h2>writer : <span>${writer}</span></h2>
                <p>
                    todo : &nbsp; <span>${title}</span>
                    <i class='delete'>Delete</i>
                </p>
            </li>`
    };
    
    ulEl.innerHTML = template;
};
getTodos();

// delete
ulEl.addEventListener('click',async(e)=>{
    if(e.target.className === 'delete'){
        const todoId = e.target.parentElement.parentElement.dataset.id;

        await fetch(todosUrl + `/${todoId}` , {
            method: "DELETE"
        });
    };
});

// edit
ulEl.addEventListener('dblclick',async(e)=>{
    const todoId = e.target.dataset.id;
    const tagName = e.target.tagName;
    const className = e.target.className;

    const isCompleted = checkboxEl.checked;
    const isCompleteBoolean = className === 'complete' ? false : true ;

    if(tagName === 'LI'){
        await fetch(todosUrl + `/${todoId}` , {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                isCompleted: isCompleteBoolean,
            })
        });
    };
});
// THE END