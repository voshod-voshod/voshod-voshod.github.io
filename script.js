// Получаем элементы DOM
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Добавляем обработчик события клика на hamburger
hamburger.addEventListener('click', () => {
    // Переключаем класс 'active' для анимации hamburger
    hamburger.classList.toggle('active');
    
    // Переключаем класс 'active' для меню
    navMenu.classList.toggle('active');
});

// Закрываем меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Закрываем меню при клике на социальные иконки
document.querySelectorAll('.nav-item.social-icons a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Функция для копирования текста в буфер обмена
async function copyToClipboard(text) {
    try {
        // Используем современный Clipboard API, если доступен
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            // Используем fallback для старых браузеров
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            textarea.style.top = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    } catch (err) {
        console.error('Ошибка при копировании текста: ', err);
    }
}

// Функция для отображения уведомления под карточкой
function showCopyNotification(message, cardElement) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'absolute';
notification.style.backgroundColor = 'var(--color-primary)';
    notification.style.border = '1px solid var(--color-border)';
    notification.style.color = 'var(--color-text-secondary)';
    notification.style.padding = '8px 16px';
    notification.style.borderRadius = 'var(--border-radius-medium)';
    notification.style.zIndex = '1000';
    notification.style.fontSize = 'var(--font-size-sm)';
    notification.style.fontFamily = "'Unbounded', sans-serif";
    notification.style.whiteSpace = 'nowrap';
    notification.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
    notification.style.textAlign = 'center';
    
// Позиционируем уведомление по центру под карточкой
    const cardRect = cardElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Добавляем временную ноду в DOM для вычисления ширины и высоты
    document.body.appendChild(notification);
    const notificationWidth = notification.offsetWidth;
    const notificationHeight = notification.offsetHeight;
    document.body.removeChild(notification);
    
    // Вычисляем позицию для центрирования уведомления под карточкой
    const leftPosition = cardRect.left + (cardRect.width / 2) - (notificationWidth / 2);
    
    // Позиционируем уведомление так, чтобы его середина находилась на уровне нижнего края карточки
    // Учитываем различия между браузерами
    const topPosition = cardRect.bottom + scrollTop - (notificationHeight / 2);
    notification.style.top = topPosition + 'px';
    notification.style.left = leftPosition + 'px';
    
    // Добавляем уведомление к body
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 2 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 2000);
}


// Добавляем обработчики кликов для иконок копирования
document.querySelectorAll('.copy-icon').forEach(icon => {
    icon.addEventListener('click', async (event) => {
        event.stopPropagation();
        
        // Находим родительскую карточку
        const card = icon.closest('.contact-card[data-copy]');
        if (card) {
            const textToCopy = card.getAttribute('data-copy');
            await copyToClipboard(textToCopy);
            
            // Отображаем уведомление под карточкой
            showCopyNotification('Скопировано!', card);
        }
    });
});

