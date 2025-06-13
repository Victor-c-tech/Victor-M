/*
 * script.js
 * Este archivo maneja toda la lógica interactiva de la página.
 * Su principal función es controlar el cambio de tema (oscuro/claro).
*/
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = 'fa-sun';
    const moonIcon = 'fa-moon';

    // Función para actualizar el ícono del botón según el tema actual
    const updateIcon = (theme) => {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove(moonIcon);
            icon.classList.add(sunIcon);
        } else {
            icon.classList.remove(sunIcon);
            icon.classList.add(moonIcon);
        }
    };

    // Función para cambiar y guardar el tema
    const switchTheme = () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    };

    // Evento click para el botón
    themeToggle.addEventListener('click', switchTheme);
    
    // Al cargar, establece el ícono correcto
    let initialTheme = document.documentElement.getAttribute('data-theme');
    updateIcon(initialTheme);

    // Listener para cambios de tema en el Sistema Operativo
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateIcon(newTheme);
            // =================================================== */
// ======== LÓGICA DEL FORMULARIO DE CONTACTO ======== */
// =================================================== */
const form = document.getElementById('contact-form');
const resultDiv = document.getElementById('form-result');

form.addEventListener('submit', function(e) {
    // Evita que el formulario se envíe de la manera tradicional
    e.preventDefault();
    
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    const json = JSON.stringify(object);

    // Muestra un mensaje de "Enviando..."
    resultDiv.innerHTML = "Enviando, por favor espera...";
    resultDiv.style.color = 'var(--text-color)'; // Color neutro

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let jsonResponse = await response.json();
            if (response.status == 200) {
                // Si el envío fue exitoso
                resultDiv.innerHTML = "¡Mensaje enviado con éxito!";
                resultDiv.style.color = 'green';
            } else {
                // Si hubo un error
                console.log(response);
                resultDiv.innerHTML = jsonResponse.message;
                resultDiv.style.color = 'red';
            }
        })
        .catch(error => {
            // Si hay un error de red
            console.log(error);
            resultDiv.innerHTML = "Algo salió mal. Inténtalo de nuevo más tarde.";
            resultDiv.style.color = 'red';
        })
        .then(function() {
            // Limpia el formulario y el mensaje después de 5 segundos
            form.reset();
            setTimeout(() => {
                resultDiv.innerHTML = '';
            }, 5000);
        });
});
        }
    });
});