// theme.js - простой и надежный переключатель темы

// Функция для переключения темы
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Применяем новую тему
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Обновляем текст кнопки
    updateThemeButton(newTheme);
    
    console.log('Тема изменена на:', newTheme);
}

// Функция для обновления текста кнопки
function updateThemeButton(theme) {
    const themeButton = document.querySelector('.theme-switcher');
    if (themeButton) {
        themeButton.textContent = theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая';
    }
}

// Функция для применения сохраненной темы при загрузке
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

// Применяем сохраненную тему при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    applySavedTheme();
    
    // Добавляем обработчики для всех кнопок переключения темы
    const themeButtons = document.querySelectorAll('.theme-switcher');
    themeButtons.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
});

// Для поддержки старых браузеров
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySavedTheme);
} else {
    applySavedTheme();
}