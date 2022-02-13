export function clearCardsContainer(): void {
  const cardsContainer = document.querySelector('.textbook-cards-container') as HTMLDivElement;
  cardsContainer.innerHTML = '';
}
