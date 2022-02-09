export class Pagination {
  private totalPages: number;

  constructor(totalPages: number) {
    this.totalPages = totalPages;
  }

  public createPaginationButtons(
    currentPage: number,
  ): HTMLElement {
    const pagContainer = document.querySelector('.pagination') as HTMLElement;

    let pagBtn = '';
    let activeBtn;
    let beforePages = currentPage - 1;
    let afterPages = currentPage + 1;

    if (currentPage > 1) {
      pagBtn += '<button class="btn prev"> < </button>';
    }

    if (currentPage > 2) {
      pagBtn += '<button class="btn prev textbook-pag-btn"> 1 </button>';

      if (currentPage > 3) {
        pagBtn += '<button class="btn prev"> ... </button>';
      }
    }

    if (currentPage === this.totalPages) {
      beforePages -= 2;
    } else if (currentPage === this.totalPages - 1) {
      beforePages -= 1;
    }

    if (currentPage === 1) {
      afterPages += 2;
    } else if (currentPage === 2) {
      afterPages += 1;
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength += 1) {
      if (pageLength === 0) {
        pageLength += 1;
      }
      if (currentPage === pageLength) {
        activeBtn = 'active';
      } else {
        activeBtn = '';
      }
      pagBtn += `<button class="btn textbook-pag-btn ${activeBtn}">${pageLength}</button>`;
    }

    if (currentPage < this.totalPages - 1) {
      if (currentPage < this.totalPages - 2) {
        pagBtn += '<button class="btn prev"> ... </button>';
      }
      pagBtn += `<button class="btn prev textbook-pag-btn"> ${this.totalPages} </button>`;
    }

    if (currentPage < this.totalPages) {
      pagBtn += '<button class="btn next"> > </button>';
    }

    pagContainer.innerHTML = pagBtn;
    pagContainer.querySelector('.prev')?.addEventListener('click', () => {
      this.createPaginationButtons(currentPage - 1);
    });

    pagContainer.querySelector('.next')?.addEventListener('click', () => {
      this.createPaginationButtons(currentPage + 1);
    });

    pagContainer.querySelectorAll('.textbook-pag-btn')?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const em = e.target as HTMLElement;
        this.createPaginationButtons(parseInt(em.innerHTML, 10));
      });
    });
    return pagContainer;
  }
}
