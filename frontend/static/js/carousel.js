let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');

function showItem(index) {
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function nextItem() {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
}

function prevItem() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
}

document.querySelector('.carousel-next').addEventListener('click', nextItem);
document.querySelector('.carousel-prev').addEventListener('click', prevItem);

// Initialize first item
showItem(currentIndex);
 