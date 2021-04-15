let curIndex  = 0,
    prevIndex = 0,
    countEl,
    elements,
    date,
    curDate,
    colorClear,
    input,
    container,
    form;
addEventListener('load', function () {

    container = document.querySelector('#feed_form');
    form = container.querySelector('form');
    if (!form) {
        return;
    }

    function run() {
        countEl = form.elements.length;
        elements = form.getElementsByClassName('feed-inner');
        curDate = date = new Date();
        createTable();
        phoneMask('.js-feed-phone', '+7(000) 000-00-00', true, true, true);
    }

    document.addEventListener('click', function (e) {
        let target = e.target;
        if (target.classList.contains('nav_arrow')) {
            navigate(target);
        }
        if (target.classList.contains('feed-inner')) {
            toggleError();
        }
    })

    let dateInput = container.querySelector('#date_birth');
    dateInput.addEventListener('click', function () {
        this.classList.toggle('hidden');
        showcalendar(this);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let data = getFormData(e.target);
        fetch('sendform.php', {
            method : 'POST',
            body   : new URLSearchParams(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                console.log(response)
            })
    })

    function getFormData(form) {
        let formInputs = {};
        for (let key in form.elements) {
            let name  = form.elements[key].name,
                value = form.elements[key].value;
            if (value && name) {
                formInputs[name] = value;
            }
        }
        return formInputs;
    }

// Навигация и валидация

    function navigate(element) {
        let isNext = element.classList.contains('next');
        if (isNext) {
            switchNext();
            return;
        }
        switchPrev();
    }

    function switchNext() {

        if (curIndex + 1 === countEl) {
            return;
        }

        if (!inputCheck()) {
            toggleError('set');
            return;
        }

        let prevArrow = container.querySelector(`.nav_arrow.prev`);
        if (prevArrow.classList.contains('hidden')) {
            toggleArrow('prev');
        }

        prevIndex = curIndex;
        curIndex++;
        if (curIndex + 1 === countEl) {
            toggleArrow('next');
        }

        collapseCard();
    }

    function inputCheck() {
        let activeInput = elements[curIndex],
            isRequired  = activeInput.dataset.required;
        return !(isRequired && activeInput.value === '');
    }

    function toggleError(mod = 'delete') {
        let activeInput = elements[curIndex];
        if (mod === 'set') {
            activeInput.classList.add('has-error');

            let errorBlock  = document.createElement('div'),
                errorMesage = document.createElement('div');
            errorBlock.classList.add('error-wrapper');
            errorMesage.classList.add('error');
            errorMesage.innerHTML = form.dataset.requireMessage;
            errorBlock.appendChild(errorMesage);
            activeInput.insertAdjacentElement('afterend', errorBlock);
            return;
        }
        activeInput.classList.remove('has-error');
        let errorBlock = container.querySelector('.error-wrapper');
        if (errorBlock) {
            errorBlock.remove();
        }
    }

    function switchPrev() {
        if (curIndex === 0) {
            return;
        }
        let nextArrow = container.querySelector(`.nav_arrow.next`);
        if (nextArrow.classList.contains('hidden')) {
            toggleArrow('next');
        }
        prevIndex = curIndex;
        curIndex--;
        if (curIndex === 0) {
            toggleArrow('prev');
        }
        collapseCard();
    }

    function toggleArrow(selector) {
        let arrow = container.querySelector(`.nav_arrow.${selector}`);
        arrow.classList.toggle('hidden');
    }

    function collapseCard() {
        let card     = elements[curIndex],
            prevCard = elements[prevIndex];
        card = card.closest('.input-container');
        prevCard = prevCard.closest('.input-container');
        prevCard.classList.remove('active');
        prevCard.classList.add('collapse');
        card.classList.remove('collapse');
        card.classList.add('active');
    }

    run();
})
