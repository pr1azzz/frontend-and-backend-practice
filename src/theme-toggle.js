// theme.js - простой и надежный переключатель темы

// Функция для переключения темы
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Применяем новую тему
    html.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Обновляем текст и иконку кнопки
    updateThemeButton(newTheme);
    
    // Применяем дополнительные стили для темной темы
    applyThemeStyles(newTheme);
}

// Функция для обновления кнопки темы
function updateThemeButton(theme) {
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        if (theme === 'light') {
            button.innerHTML = '<i class="bi bi-moon-fill"></i> Тёмная';
            button.classList.remove('btn-dark');
            button.classList.add('btn-outline-light');
        } else {
            button.innerHTML = '<i class="bi bi-sun-fill"></i> Светлая';
            button.classList.remove('btn-outline-light');
            button.classList.add('btn-dark');
        }
    });
}

// Функция для применения дополнительных стилей темы
function applyThemeStyles(theme) {
    // Удаляем старые стили
    const oldStyles = document.getElementById('theme-styles');
    if (oldStyles) {
        oldStyles.remove();
    }
    
    if (theme === 'dark') {
        // Добавляем стили для темной темы
        const style = document.createElement('style');
        style.id = 'theme-styles';
        style.textContent = `
            [data-bs-theme="dark"] {
                --bs-body-bg: #1a1a1a;
                --bs-body-color: #e9ecef;
            }
            [data-bs-theme="dark"] .card {
                background-color: #2d2d2d;
                border-color: #404040;
            }
            [data-bs-theme="dark"] .card-header {
                background-color: #343a40 !important;
                border-bottom-color: #404040;
            }
            [data-bs-theme="dark"] .text-muted {
                color: #adb5bd !important;
            }
            [data-bs-theme="dark"] .bg-light {
                background-color: #343a40 !important;
            }
            [data-bs-theme="dark"] .progress {
                background-color: #404040;
            }
        `;
        document.head.appendChild(style);
    }
}

// Функция для инициализации темы при загрузке страницы
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeButton(savedTheme);
    applyThemeStyles(savedTheme);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    // Добавляем обработчики для всех кнопок переключения темы
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
});

// Для страниц, которые могут загрузиться после DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}