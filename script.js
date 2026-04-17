 const todoInput = document.getElementById('todo-input');
        const addBtn = document.getElementById('add-btn');
        const todoList = document.getElementById('todo-list');

        let todos = JSON.parse(localStorage.getItem('todos')) || [];

        function renderTodos() {
            todoList.innerHTML = '';
            todos.forEach((todo, index) => {
                const li = document.createElement('li');
                if (todo.done) {
                    li.classList.add('done');
                }
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.done;
                checkbox.classList.add('checkbox');
                checkbox.addEventListener('change', () => toggleDone(index));
                li.appendChild(checkbox);
                const span = document.createElement('span');
                span.textContent = todo.text;
                li.appendChild(span);
                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h9.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`;
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteTodo(index);
                });
                li.appendChild(deleteBtn);
                todoList.appendChild(li);
            });
        }

        function addTodo() {
            const text = todoInput.value.trim();
            if (text) {
                todos.push({ text, done: false });
                todoInput.value = '';
                renderTodos();
                saveTodos();
            }
        }

        function toggleDone(index) {
            todos[index].done = !todos[index].done;
            renderTodos();
            saveTodos();
        }

        function deleteTodo(index) {
            todos.splice(index, 1);
            renderTodos();
            saveTodos();
        }

        function saveTodos() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        addBtn.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodo();
            }
        });

        renderTodos();