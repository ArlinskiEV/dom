(function () {
    document.addEventListener('click', function globalClick(event) {
        document.removeEventListener('click', globalClick);
        strip(event.target);
    });

    styles('body:not(.strip-parent) { cursor: crosshair !important; }');

    function strip(node) {
        const headerHeight = node.offsetHeight;
        while (node.offsetHeight < headerHeight * 4) {
            node = node.parentNode;
        }
        node.classList.add('strip-content');
        node.style.width = `${node.offsetWidth}px`;
        while (node !== document) {
            node.classList.add('strip-parent');
            node = node.parentNode;
        }
        styles('.strip-parent:not(.strip-content) > :not(.strip-parent) { display: none !important; }');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    function styles(content) {
        const style = document.createElement('style');
        style.innerHTML = content;
        document.body.appendChild(style);
    }
})();