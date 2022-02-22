export function clearCardsContainer(): void {
  const cardsContainer = document.querySelector('.textbook-cards-container') as HTMLDivElement;
  cardsContainer.innerHTML = '';
}

export function hidePagination(state: boolean): void {
  const pagination = document.querySelector('.textbook-pagination') as HTMLElement;
  if (state) {
    pagination.classList.add('invisible');
  } else {
    pagination.classList.remove('invisible');
  }
}
