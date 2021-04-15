function insertNodeText(obj, text) {
    let txtNode = document.createTextNode(text);
    obj.appendChild(txtNode);
    return obj;
}

function insertButton(obj, text, flag) {
    let buttons = Array(2);
    for (let i = 0; i < buttons.length; i++) {
        let button  = document.createElement('div'),
            caption = (i === flag) ? text + text : text;
        button.classList.add('button');
        button = insertNodeText(button, caption);
        button.onclick = controlButton;
        obj.appendChild(button);
    }
}

function getCountDay(index) {
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (date.getFullYear() % 4 === 0)
        months[1]++;
    return months[index];
}

function getCountWeek(date) {
    date.setDate(1);
    return Math.ceil((getCountDay(date.getMonth()) + getNumberDay(date)) / 7);
}

function getNumberDay(date) {
    let days = [6, 0, 1, 2, 3, 4, 5];
    return days[date.getDay()];
}

function getNumberFirstDay(date) {
    date.setDate(1);
    return getNumberDay(date);
}

function controlButton() {
    if (this.lastChild.nodeValue.length === 1) {
        let m = (this.lastChild.nodeValue === '<') ? date.getTime() - (24 * 60 * 60 * 1000 * date.getDate()) : date.getTime() + (24 * 60 * 60 * 1000 * (getCountDay(date.getMonth()) - date.getDate() + 1));
        date.setTime(m);
    } else {
        let Y = (this.lastChild.nodeValue === '<<') ? date.getFullYear() - 1 : date.getFullYear() + 1;
        date.setFullYear(Y);
    }
    generateCalendar();
}

function createTable() {
    let days  = ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'],
        inner = container.querySelector('#date_birth'),
        div   = document.createElement('div');

    inner = inner.closest('.input-container');

    inner.appendChild(div);
    div.setAttribute('id', 'calendar');
    div.className = 'calendar-wrapper';

    let tbl = document.createElement("table");
    div.appendChild(tbl);

    tbl.setAttribute('align', 'center');
    tbl.setAttribute('cellpadding', '0');
    tbl.setAttribute('cellspacing', '0');

    let row = tbl.insertRow(-1);
    row.setAttribute('id', 'first-child');

    // первая ячейка
    let cell = row.insertCell(-1);
    cell.setAttribute('colspan', '2');
    cell.className = 'lalign';
    cell = insertButton(cell, '<', 0);

    // вторая ячейка
    cell = row.insertCell(-1);
    cell.setAttribute('colspan', '3');

    // третья ячейка
    cell = row.insertCell(-1);
    cell.setAttribute('colspan', '2');
    cell.className = 'ralign';
    cell = insertButton(cell, '>', 1);

    row = tbl.insertRow(-1);
    row.className = 'day';
    for (let i = 0; i < 7; i++) {
        cell = row.insertCell(-1);
        cell = insertNodeText(cell, days[i]);
        if (i === 6)
            cell.style.color = '#ee0000';
    }
}

function generateCalendar() {
    let wrapper = document.getElementById('calendar');
    let tbl = wrapper.getElementsByTagName('table')[0];

    let months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

    tbl.rows[0].cells[1].innerHTML = months[date.getMonth()] + ' ' + date.getFullYear();

    while (tbl.rows.length > 2)
        tbl.deleteRow(tbl.rows.length - 1);

    let flag = false;
    let countday = 1;

    for (let i = 0; i < getCountWeek(date); i++) {
        let row = tbl.insertRow(-1);
        for (let j = 0; j < 7; j++) {
            cell = row.insertCell(-1);
            if (j === getNumberFirstDay(date))
                flag = true;
            if (flag && countday <= getCountDay(date.getMonth())) {
                cell = insertNodeText(cell, countday);

                cell.onclick = function () {
                    document.getElementById('calendar').style.display = 'none';
                    date.setDate(this.lastChild.nodeValue);
                    let d = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
                    let m = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                    // Порядок вывода даты (День, Месяц, Год)
                    input.value = d + '.' + m + '.' + date.getFullYear();
                    input.classList.toggle('hidden');

                };
                cell.onmouseover = function () {
                    colorClear = this.className;
                    this.className = 'select';
                };
                cell.onmouseout = function () {
                    this.className = colorClear;
                };
                if (j === 6)
                    cell.className = 'sunday';
                else
                    cell.className = 'default-day';
                if (curDate.getFullYear() === date.getFullYear() && curDate.getMonth() === date.getMonth() && curDate.getDate() === countday)
                    cell.className = 'curr-day';

                countday++;
            } else {
                cell.style.border = 'none';
                cell = insertNodeText(cell, ' ');
            }
        }
    }
}

function showcalendar(input_date) {
    input = input_date;
    let wrapper = document.getElementById('calendar');

    if (input.value !== '') {
        // Разделяем переданную дату
        let ar = input.value.split('.');
        // Массив параметров (День, Месяц, Год)
        // В Конструктор Date передаем в другом порядке, а именно: Год, Месяц, День
        // ar[2] - Год
        // ar[1] - Месяц
        // ar[0] - День
        // В JavaScript месяца идут с 0 до 11, поэтому мы от номера месяца отнимаем единицу
        date = new Date(ar[2], ar[1] - 1, ar[0]);
    }

    generateCalendar();
    wrapper.style.display = (wrapper.style.display === "block") ? "none" : "block";
}