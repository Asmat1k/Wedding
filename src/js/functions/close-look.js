export function closeLook() {
  const cards = document.querySelectorAll('.wishes-block .block__content');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(card => {
        card.classList.remove('close-look');
      })
      card.classList.toggle('close-look');
    });
  });
}