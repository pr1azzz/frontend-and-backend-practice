function submitForm() {
    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        category: formData.get('category'),
        message: formData.get('message')
    };

    console.log('Данные формы:', data);

    // Добавляем визуальную обратную связь
    const submitBtn = document.querySelector('.btn--primary');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    setTimeout(() => {
        alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        contactModal.close();
        form.reset();
    }, 1500);
}

function cancelForm() {
    const modal = document.getElementById('contactModal');
    const form = document.getElementById('feedbackForm');
    
    modal.close();
    form.reset();
}

// Добавляем обработчики для модального окна
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const form = document.getElementById('feedbackForm');
    
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.close();
            }
        });

        // Добавляем обработчики для интерактивности полей формы
        const inputs = form.querySelectorAll('.form__input, .form__select, .form__textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('form__group--focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('form__group--focused');
                }
            });

            // Валидация в реальном времени
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('form__input--invalid');
                    this.classList.add('form__input--valid');
                } else {
                    this.classList.remove('form__input--valid');
                    this.classList.add('form__input--invalid');
                }
            });
        });
    }
});

// Предотвращаем отправку формы по Enter в полях ввода (кроме textarea)
document.getElementById('feedbackForm').addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.target.type !== 'textarea') {
        event.preventDefault();
    }
});

// Добавляем стили для валидации в реальном времени
const style = document.createElement('style');
style.textContent = `
    .form__input--valid {
        border-color: var(--color-success) !important;
    }
    
    .form__input--invalid {
        border-color: var(--color-error) !important;
    }
    
    .form__group--focused .form__label {
        color: var(--color-primary);
    }
`;
document.head.appendChild(style);