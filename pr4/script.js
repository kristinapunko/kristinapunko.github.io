document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('task');
    const list = document.getElementById('list');

    loadTasks();

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value !== '') {
            const text = input.value;
            const time = new Date().toLocaleString(); 
            add(text, time, false); 
            input.value = '';
        }
    });

    function add(text, time, completed) {
        const item = document.createElement('li');
        item.className = 'task-item';

        // Створюємо checkbox тільки для незавершених завдань
        if (!completed) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', () => {
                item.classList.toggle('completed');
                if (item.classList.contains('completed')) {
                    checkbox.remove(); // Видалення чекбокса
                }
                saveTasks();
            });
            item.appendChild(checkbox);
        } else {
            item.classList.add('completed'); // Додаємо клас виконаного
        }

        const content = document.createElement('span');
        content.textContent = `${text} (${time})`; // Включаємо час завдання

        content.addEventListener('dblclick', () => edit(item, content, text)); 

        const del = document.createElement('span');
        del.textContent = '✖';
        del.className = 'delete';
        del.addEventListener('click', () => {
            item.remove();
            saveTasks();
        });

        item.appendChild(content);
        item.appendChild(del);
        list.appendChild(item);
        saveTasks();
    }

    function edit(item, content, oldText) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = oldText; 

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim() !== '') {
                const newTime = new Date().toLocaleString(); 
                content.textContent = `${input.value.trim()} (${newTime})`; 
                item.replaceChild(content, input);
                saveTasks();
            }
        });

        item.replaceChild(input, content);
        input.focus();
    }

    // Функція для збереження завдань у localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(item => {
            const text = item.querySelector('span').textContent; // Текст завдання з часом
            const isCompleted = item.classList.contains('completed'); 
            tasks.push(`${text}|${isCompleted}`); 
        });
        localStorage.setItem('tasks', tasks.join(';')); 
    }

    function loadTasks() {
        const tasksString = localStorage.getItem('tasks') || '';
        const tasks = tasksString.split(';'); 

        tasks.forEach(task => {
            if (task) {
                const [text, completedStr] = task.split('|'); // Розділяємо текст і статус
                const completed = completedStr === 'true'; 
                const time = text.substring(text.lastIndexOf('(') + 1, text.lastIndexOf(')')); // час з тексту
                const taskDescription = text.substring(0, text.lastIndexOf('(')); // текст без часу
                add(taskDescription, time, completed); 
            }
        });
    }
});
