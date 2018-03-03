document.addEventListener('DOMContentLoaded', function () {
    const navbarSpans = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    const navbarBrand = document.querySelector('.navbar-brand a img');
    const activeClass = 'is-active';

    if (navbarSpans.length > 0) {
        navbarSpans.forEach(e => {
            e.addEventListener('click', () => {
                const target = e.dataset.target;
                const dropdownContent = document.getElementById(target);

                e.classList.toggle(activeClass);
                dropdownContent.classList.toggle(activeClass);
                navbarBrand.classList.toggle(activeClass);
            });
        });
    }
});
