const carousel = document.querySelector('.carousel');
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
  isDown = false;
});

carousel.addEventListener('mouseup', () => {
  isDown = false;
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast
  carousel.scrollLeft = scrollLeft - walk;
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.carousel-nav.prev');
  const nextButton = document.querySelector('.carousel-nav.next');
  
  let currentIndex = 0;

  function updateCarousel() {
    // Remove active class from all items
    items.forEach(item => item.classList.remove('active'));
    // Add active class to current item
    items[currentIndex].classList.add('active');
    // Move track
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function moveNext() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }

  function movePrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  }

  // Event listeners
  nextButton.addEventListener('click', moveNext);
  prevButton.addEventListener('click', movePrev);

  // Optional: Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') movePrev();
    if (e.key === 'ArrowRight') moveNext();
  });

  // Initialize carousel
  updateCarousel();
});
