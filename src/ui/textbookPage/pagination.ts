export class Pagination {
  private readonly totalPages: number;

  constructor(totalPages: number) {
    this.totalPages = totalPages;
  }

  public createPaginationButtons(
    currentPageBtn: number,
  ): HTMLElement {
    const pagContainer = document.querySelector('.pagination') as HTMLElement;

    let pagBtn = '';
    let activeBtn;
    let beforePages = currentPageBtn - 1;
    let afterPages = currentPageBtn + 1;

    if (currentPageBtn > 1) {
      pagBtn += '<button class="btn prev"> < </button>';
    }

    if (currentPageBtn > 2) {
      pagBtn += '<button class="btn prev textbook-pag-btn"> 1 </button>';

      if (currentPageBtn > 3) {
        pagBtn += '<button class="btn dots"> ... </button>';
      }
    }

    if (currentPageBtn === this.totalPages) {
      beforePages -= 2;
    } else if (currentPageBtn === this.totalPages - 1) {
      beforePages -= 1;
    }

    if (currentPageBtn === 1) {
      afterPages += 2;
    } else if (currentPageBtn === 2) {
      afterPages += 1;
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength += 1) {
      if (pageLength > this.totalPages) {
        continue;
      }
      if (pageLength === 0) {
        pageLength += 1;
      }
      if (currentPageBtn === pageLength) {
        activeBtn = 'active';
      } else {
        activeBtn = '';
      }
      pagBtn += `<button class="btn textbook-pag-btn ${activeBtn}">${pageLength}</button>`;
    }

    if (currentPageBtn < this.totalPages - 1) {
      if (currentPageBtn < this.totalPages - 2) {
        pagBtn += '<button class="btn dots"> ... </button>';
      }
      pagBtn += `<button class="btn prev textbook-pag-btn"> ${this.totalPages} </button>`;
    }

    if (currentPageBtn < this.totalPages) {
      pagBtn += '<button class="btn next"> > </button>';
    }

    pagContainer.innerHTML = pagBtn;
    pagContainer.querySelector('.prev')
      ?.addEventListener('click', () => {
        this.createPaginationButtons(currentPageBtn - 1);
        this.setToLocalStorage('currPage', currentPageBtn - 1);
      });

    pagContainer.querySelector('.next')
      ?.addEventListener('click', () => {
        this.createPaginationButtons(currentPageBtn + 1);
        this.setToLocalStorage('currPage', currentPageBtn + 1);
      });

    pagContainer.querySelectorAll('.textbook-pag-btn')
      ?.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const page = e.target as HTMLElement;
          this.createPaginationButtons(parseInt(page.innerHTML, 10));
          this.setToLocalStorage('currPage', parseInt(page.innerHTML, 10));
        });
      });
    return pagContainer;
  }

  public setToLocalStorage(itemName: string, itemValue: number): void {
    localStorage.setItem(itemName, `${itemValue}`);
  }
}
