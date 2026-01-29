// Получаем элементы
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.header__nav');
const scrollTopButton = document.getElementById('scrollTop');

// Создаем оверлей для меню
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// Функция открытия/закрытия меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    // Переключаем состояния
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');

    // Блокируем скролл при открытом меню
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

// Функция закрытия меню
function closeMenu() {
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Обработчики событий
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
}

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    });
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        closeMenu();
    }
});

// Закрытие меню при изменении размера окна (если перешли на десктоп)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
        closeMenu();
    }
});

// Кнопка "Наверх"
if (scrollTopButton) {
    // Показываем кнопку после скролла
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    // Прокрутка к началу страницы
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Для touch-устройств добавляем визуальную обратную связь
        scrollTopButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            scrollTopButton.style.transform = '';
        }, 150);
    });

    // Улучшение для touch-устройств
    scrollTopButton.addEventListener('touchstart', () => {
        scrollTopButton.style.opacity = '0.7';
    });

    scrollTopButton.addEventListener('touchend', () => {
        scrollTopButton.style.opacity = '';
    });
}

// Предотвращение горизонтального скролла на мобильных
document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1 || document.body.style.overflow === 'hidden') {
        e.preventDefault();
    }
}, { passive: false });

// Добавление skip link для доступности
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-link visually-hidden';
skipLink.textContent = 'Перейти к основному содержанию';
document.body.prepend(skipLink);

// Фокус на skip link при нажатии Tab
skipLink.addEventListener('focus', function() {
    this.classList.remove('visually-hidden');
});

skipLink.addEventListener('blur', function() {
    this.classList.add('visually-hidden');
});