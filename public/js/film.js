getFilms();
async function getFilms() {
  try {
    const res = await fetch('/api/film', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();

    const { message } = json;

    if (res.status > 399) {
      return PopNoty({ type: 'alert', message });
    }

    if (message) {
      PopNoty({ type: 'alert', message });
    }

    if (Array.isArray(json)) {
      initTable(json);
    }
  } catch (e) {
    return PopNoty({ type: 'error', message: e.message });
  }
}

function initTable(filmArr) {
  const table = document.querySelector('.film__list tbody');

  table.innerHTML = '';

  if (filmArr < 1) {
    return (table.innerHTML += '<div style="text-align: center;margin: 0 auto;">Not data</div>');
  }

  filmArr.forEach((obj, index) => {
    let { id, name, time, premier, date, description } = obj;

    time = moment(time).format('HH:mm:ss');
    premier = moment(premier).format('YYYY-MM-DD');
    date = moment(date).format('YYYY-MM-DD');

    const tr = document.createElement('tr');
    tr.classList.add('film__item');
    tr.classList.add('film-item');
    tr.dataset.index = index;
    tr.dataset.id = id;
    tr.dataset.content = JSON.stringify(obj);

    tr.innerHTML += `<td><input name="name" type="text" value="${name}" title="${name}" disabled></td>`;
    tr.innerHTML += `<td><input name="time" type="text" value="${time}" title="${time}" disabled></td>`;
    // moment({ years:2010, months:3, date:5, hours:15, minutes:10, seconds:3, milliseconds:123})
    tr.innerHTML += `<td> <input name="premier" type="text" value="${premier}" disabled></td>`;
    tr.innerHTML += `<td> <input name="date" type="text" value="${date}" disabled></td>`;
    tr.innerHTML += `<td> <textarea name="description" rows="2" cols="20" maxlength="1000"
    disabled
    >${description}</textarea></td>`;
    // <input name="description" type="text" value="${description}" disabled>

    let filmItemAction = document.createElement('td');
    filmItemAction.classList.add('film-item__action');
    filmItemAction.classList.add('film-action');
    tr.appendChild(filmItemAction);

    let i = document.createElement('i');
    i.classList.add('fas');
    i.classList.add('fa-ellipsis-v');
    i.addEventListener('click', toggleActionList);
    filmItemAction.appendChild(i);

    let filmActionList = document.createElement('ul');
    filmActionList.classList.add('film-action__list');
    filmActionList.dataset.index = index;
    filmItemAction.appendChild(filmActionList);

    let filmActionEdit = document.createElement('li');
    filmActionEdit.classList.add('film-action__item');
    filmActionEdit.classList.add('film-action__edit');
    filmActionEdit.addEventListener('click', editFilmSingle);
    filmActionEdit.innerHTML = 'edit';
    filmActionList.appendChild(filmActionEdit);

    let filmActionSave = document.createElement('li');
    filmActionSave.classList.add('film-action__item');
    filmActionSave.classList.add('film-action__save');
    filmActionSave.addEventListener('click', saveFilmSingle);
    filmActionSave.innerHTML = 'save';
    filmActionList.appendChild(filmActionSave);

    let filmActionDelete = document.createElement('li');
    filmActionDelete.classList.add('film-action__item');
    filmActionDelete.classList.add('film-action__delete');
    filmActionDelete.addEventListener('click', deleteFilmSingle);
    filmActionDelete.innerHTML = 'delete';
    filmActionList.appendChild(filmActionDelete);

    table.insertAdjacentElement('beforeend', tr);
  });
}

function toggleActionList(e) {
  const list = e.target.parentElement.querySelector('.film-action__list');
  const listAll = document.querySelectorAll('.film-action__list_active');

  if (list.classList.contains('film-action__list_active')) {
    list.classList.remove('film-action__list_active');
  } else {
    listAll.forEach(val => {
      val.classList.remove('film-action__list_active');
    });
    list.classList.add('film-action__list_active');
  }
}

function editFilmSingle() {
  const itemIndex = this.parentElement.dataset.index;
  const itemList = document.querySelectorAll('.film__item');
  let item = itemList[itemIndex];

  const nameInput = item.querySelector('[name=name]');
  const timeInput = item.querySelector('[name=time]');
  const premierInput = item.querySelector('[name=premier]');
  const dateInput = item.querySelector('[name=date]');
  const descriptionTextarea = item.querySelector('[name=description]');

  if (item.classList.contains('film-item_edit')) {
    item.classList.remove('film-item_edit');

    nameInput.setAttribute('disabled', true);
    timeInput.setAttribute('disabled', true);
    premierInput.setAttribute('disabled', true);
    dateInput.setAttribute('disabled', true);
    descriptionTextarea.setAttribute('disabled', true);
  } else {
    item.classList.add('film-item_edit');

    nameInput.removeAttribute('disabled');
    timeInput.removeAttribute('disabled');
    premierInput.removeAttribute('disabled');
    dateInput.removeAttribute('disabled');
    descriptionTextarea.removeAttribute('disabled');
  }
}

async function saveFilmSingle(e) {
  const itemIndex = this.parentElement.dataset.index;
  const itemList = document.querySelectorAll('.film__item');

  let item = itemList[itemIndex];

  const nameInput = item.querySelector('[name=name]');
  const timeInput = item.querySelector('[name=time]');
  const premierInput = item.querySelector('[name=premier]');
  const dateInput = item.querySelector('[name=date]');
  const descriptionTextarea = item.querySelector('[name=description]');

  const nameInputValue = nameInput.value;
  const timeInputValue = timeInput.value;
  const premierInputValue = premierInput.value;
  const dateInputValue = dateInput.value;
  const descriptionTextareaValue = descriptionTextarea.value;

  let { id, name, time, premier, date, description } = JSON.parse(item.dataset.content);

  time = moment(time).format('HH:mm:ss');
  premier = moment(premier).format('YYYY-MM-DD');
  date = moment(date).format('YYYY-MM-DD');

  if (
    nameInputValue === name &&
    timeInputValue === time &&
    premierInputValue === premier &&
    dateInputValue === date &&
    descriptionTextareaValue === description
  ) {
    this.parentElement.classList.remove('film-action__list_active');
    return PopNoty({ type: 'alert', message: 'Сохранение отменено, данные остались в изначальном виде' });
  }

  let obj = {};

  if (name !== nameInputValue) obj.name = nameInputValue;
  if (time !== timeInputValue) obj.time = timeInputValue;
  if (premier !== premierInputValue) obj.premier = premierInputValue;
  if (date !== dateInputValue) obj.date = dateInputValue;
  if (description !== descriptionTextareaValue) obj.description = descriptionTextareaValue;

  try {
    const res = await fetch(`/api/film/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    const json = await res.json();

    if (res.status > 399) {
      return PopNoty({ type: 'alert', message: json.message });
    }

    if (json.message) {
      PopNoty({ type: 'alert', message: json.message });
    }

    if (json) {
      this.parentElement.classList.remove('film-action__list_active');
      if (item.classList.contains('film-item_edit')) {
        item.classList.remove('film-item_edit');

        nameInput.setAttribute('disabled', true);
        timeInput.setAttribute('disabled', true);
        premierInput.setAttribute('disabled', true);
        dateInput.setAttribute('disabled', true);
        descriptionTextarea.setAttribute('disabled', true);

        let content = JSON.parse(item.dataset.content);

        item.dataset.content = JSON.stringify(content);
      }

      PopNoty({ type: 'alert', message: `Film ${id} chenged` });
    }
  } catch (e) {
    return PopNoty({ type: 'error', message: e.message });
  }
}

async function deleteFilmSingle(e) {
  const itemIndex = this.parentElement.dataset.index;
  const itemList = document.querySelectorAll('.film__item');
  const item = itemList[itemIndex];

  const { id } = item.dataset;

  console.log(id);

  try {
    const res = await fetch(`/api/film/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();

    if (res.status > 399) {
      return PopNoty({ type: 'alert', message: json.message });
    }

    if (json.message) {
      PopNoty({ type: 'alert', message: json.message });
    }

    if (json) {
      item.parentNode.removeChild(item);

      PopNoty({ type: 'alert', message: `Film ${id} deleted` });
    }
  } catch (e) {
    return PopNoty({ type: 'error', message: e.message });
  }
}
