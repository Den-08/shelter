class myPopup {                                              // задаем класс
    constructor(elemClass, btnClass) {                                  // конструктор        
        this.elemClass = elemClass;
        this.btnClass = btnClass;

        this.elem = document.querySelector(`.${elemClass}`);
        this.btn = document.querySelectorAll(`.${btnClass}`);
    }
    show() {                                   // метод
        this.elem.classList.add('visible');
    }
    close() {                                   // метод
        this.elem.classList.remove('visible');
    }
}

let popup = new myPopup('popup', 'popup__button');                        // создаем новый объект с помощью конструктора

popup.btn.forEach((item) => {
    item.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');
        document.querySelector(`[data-target="${path}"]`).classList.add('visible');
        popup.show();
        body.classList.add("noscroll");
    })
});

popup.elem.addEventListener('click', (e) => {
    if (e.target == e.currentTarget.firstElementChild) {
        for (let i = 0; i < e.target.children.length; i++) {
            e.target.children[i].classList.remove('visible');
        };
        popup.close();
        body.classList.remove("noscroll");
    }
});
