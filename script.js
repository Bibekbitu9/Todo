const taskList = document.getElementById('task-list'); 
const addTaskBtn = document.getElementById('add-task-btn'); 
const taskInput = document.getElementById('task-input'); 

let draggedItem = null; 

// Add new task 
addTaskBtn.addEventListener('click', () => { 
    const taskText = taskInput.value.trim(); 
    if (taskText !== '') { 
        const newTask = document.createElement('li'); 
        newTask.textContent = taskText; 
        newTask.setAttribute('draggable', 'true'); 
        taskList.appendChild(newTask); 
        taskInput.value = ''; 
    } 
}); 

// Drag and drop functionality 
taskList.addEventListener('dragstart', (e) => { 
    draggedItem = e.target; 
    setTimeout(() => { 
        e.target.style.display = 'none'; 
    }, 0); 
}); 

taskList.addEventListener('dragend', (e) => { 
    setTimeout(() => { 
        e.target.style.display = ''; 
        draggedItem = null; 
    }, 0); 
}); 

taskList.addEventListener('dragover', (e) => { 
    e.preventDefault(); 
    const afterElement = getDragAfterElement(taskList, e.clientY); 
    if (afterElement == null) { 
        taskList.appendChild(draggedItem); 
    } else { 
        taskList.insertBefore(draggedItem, afterElement); 
    } 
}); 

function getDragAfterElement(container, y) { 
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')]; 

    return draggableElements.reduce((closest, child) => { 
        const box = child.getBoundingClientRect(); 
        const offset = y - box.top - box.height / 2; 
        if (offset < 0 && offset > closest.offset) { 
            return { offset: offset, element: child }; 
        } else { 
            return closest; 
        } 
    }, { offset: Number.NEGATIVE_INFINITY }).element; 
} 
