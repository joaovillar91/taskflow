// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const inputTarea = document.getElementById('nuevaTarea');
    const agregarBtn = document.getElementById('agregarBtn');
    const listaTareas = document.getElementById('listaTareas');

    // Event Listeners
    agregarBtn.addEventListener('click', agregarTarea);
    inputTarea.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') agregarTarea();
    });

    // Funciones
    function renderizarTareas() {
        listaTareas.innerHTML = tareas.map((tarea, index) => `
            <li class="${tarea.completada ? 'completed' : ''}">
                <span>${tarea.texto}</span>
                <div class="task-actions">
                    <button class="complete-btn" data-index="${index}">✓</button>
                    <button class="delete-btn" data-index="${index}">×</button>
                </div>
            </li>
        `).join('');

        // Agregar eventos a los botones
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                toggleCompletada(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                eliminarTarea(index);
            });
        });
    }

    function agregarTarea() {
        const texto = inputTarea.value.trim();
        if (texto) {
            tareas.push({ texto, completada: false });
            guardarTareas();
            inputTarea.value = '';
            renderizarTareas();
        }
    }

    function toggleCompletada(index) {
        tareas[index].completada = !tareas[index].completada;
        guardarTareas();
        renderizarTareas();
    }

    function eliminarTarea(index) {
        tareas.splice(index, 1);
        guardarTareas();
        renderizarTareas();
    }

    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    // Inicializar
    renderizarTareas();
});
