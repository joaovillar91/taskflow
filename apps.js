document.addEventListener('DOMContentLoaded', function() {
    // Cargar tareas almacenadas
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const inputTarea = document.getElementById('nuevaTarea');
    const agregarBtn = document.getElementById('agregarBtn');
    const listaTareas = document.getElementById('listaTareas');

    // Función para renderizar tareas
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

        // Agregar eventos a los botones de cada tarea
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                tareas[index].completada = !tareas[index].completada;
                guardarTareas();
                renderizarTareas();
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                tareas.splice(index, 1);
                guardarTareas();
                renderizarTareas();
            });
        });
    }

    // Función para agregar nueva tarea
    function agregarTarea() {
        const texto = inputTarea.value.trim();
        if (texto) {
            tareas.push({ texto, completada: false });
            inputTarea.value = '';
            guardarTareas();
            renderizarTareas();
        }
    }

    // Función para guardar en localStorage
    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    // Event Listeners
    agregarBtn.addEventListener('click', agregarTarea);
    inputTarea.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') agregarTarea();
    });

    // Renderizar tareas al cargar
    renderizarTareas();
});
