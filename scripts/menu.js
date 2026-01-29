// Меню для мобильных
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.header__nav');

if (menuToggle && mainNav) {
    // Функция переключения меню
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    }
    
    // Клик по гамбургеру
    menuToggle.addEventListener('click', toggleMenu);
    
    // Закрытие меню при клике на ссылку (на мобильных)
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Закрываем меню на мобильных
                    if (window.innerWidth <= 768) {
                        toggleMenu();
                    }
                    
                    // Плавный скролл
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        });
    });
}

// Кнопка "Наверх" - ПРОСТАЯ РАБОТАЮЩАЯ ВЕРСИЯ
const scrollTopButton = document.getElementById('scrollTop');

if (scrollTopButton) {
    console.log('Кнопка "Наверх" найдена, добавляю обработчик...');
    
    scrollTopButton.addEventListener('click', function(e) {
        console.log('Клик по кнопке "Наверх"');
        e.preventDefault();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} else {
    console.error('Кнопка "Наверх" не найдена! Проверьте HTML');
}

// Блокируем ссылки в футере (если они есть)
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer__link[href="#"]');
    
    if (footerLinks.length > 0) {
        footerLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            });
        });
    }
});