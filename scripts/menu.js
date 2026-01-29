// Получаем элементы
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.header__nav');

// Функция открытия/закрытия меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    // Переключаем состояния
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
}

// Обработчик для гамбургера
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Закрытие меню при клике на ссылку (на мобильных)
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            // Небольшая задержка для плавного перехода
            setTimeout(() => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }, 300);
        }
    });
});

// Закрытие меню при изменении размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Кнопка "Наверх" - всегда видимая
const scrollTopButton = document.getElementById('scrollTop');
if (scrollTopButton) {
    // Убираем логику появления/скрытия - кнопка всегда видна
    
    // Прокрутка к началу страницы
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.querySelectorAll('.footer__link[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
});