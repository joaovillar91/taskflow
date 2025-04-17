document.addEventListener('DOMContentLoaded', function() {
    // Cargar tareas guardadas
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    
    // Elementos del DOM
    const inputTarea = document.getElementById('nuevaTarea');
    const agregarBtn = document.getElementById('agregarBtn');
    const listaTareas = document.getElementById('listaTareas');
    
    // Función para guardar tareas
    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
    
    // Función para renderizar tareas
    function renderizarTareas() {
        listaTareas.innerHTML = '';
        
        tareas.forEach((tarea, index) => {
            const li = document.createElement('li');
            li.className = tarea.completada ? 'completed' : '';
            
            li.innerHTML = `
                <span>${tarea.texto}</span>
                <div>
                    <button class="complete-btn" data-index="${index}">✓</button>
                    <button class="delete-btn" data-index="${index}">×</button>
                </div>
            `;
            
            listaTareas.appendChild(li);
        });
        
        // Agregar eventos a los botones
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                tareas[index].completada = !tareas[index].completada;
                guardarTareas();
                renderizarTareas();
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                tareas.splice(index, 1);
                guardarTareas();
                renderizarTareas();
            });
        });
    }
    
    // Función para agregar tarea
    function agregarTarea() {
        const texto = inputTarea.value.trim();
        if (texto !== '') {
            tareas.push({ texto, completada: false });
            inputTarea.value = '';
            guardarTareas();
            renderizarTareas();
        }
    }
    
    // Event listeners
    agregarBtn.addEventListener('click', agregarTarea);
    
    inputTarea.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarTarea();
        }
    });
    
    // Renderizar tareas al cargar
    renderizarTareas();
});
