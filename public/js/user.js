getUsers();
async function getUsers() {
  try {
    const res = await fetch('/user', {
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

function initTable(userArr) {
  const table = document.querySelector('.user__list tbody');

  table.querySelectorAll('.user__item').forEach(tr => tr.parentNode.removeChild(tr));

  if (userArr < 1) {
    return (table.innerHTML += '<div style="text-align: center;margin: 0 auto;">Нет данных</div>');
  }

  userArr.forEach((obj, index) => {
    let { id, name, email, status, ts_create, ts_login } = obj;

    ts_login = ts_login ? moment(ts_login).format('YYYY-MM-DD HH:mm') : 'Did not go';

    const tr = document.createElement('tr');
    tr.classList.add('user__item');
    tr.classList.add('user-item');
    tr.dataset.index = index;
    tr.dataset.id = id;
    tr.dataset.content = JSON.stringify(obj);

    tr.innerHTML += `<td class="user-item__id"><input name="id" type="text" value="${id}" title="${id}" disabled></td>`;
    tr.innerHTML += `<td class="user-item__email"><input name="email" type="text" value="${email}" title="${email}" disabled></td>`;
    tr.innerHTML += `
    <td class="user-item__status">
      <select name="status" disabled>
        <option ${10 === status ? 'selected' : ''} value="10">Admin</option>
        <option ${1 === status ? 'selected' : ''} value="1">Default</option>
        <option ${0 === status ? 'selected' : ''} value="0">Blocked</option>
        <option ${-1 === status ? 'selected' : ''} value="-1">Deleted</option>
      </select>
    </td>
    `;

    tr.innerHTML += `<td class="user-item__ts_create" name="ts_create">${moment(ts_create).format(
      'YYYY-MM-DD HH:mm'
    )}</td>`;
    tr.innerHTML += `<td class="user-item__ts_login" name="ts_login">${ts_login}</td>`;

    let userItemAction = document.createElement('td');
    userItemAction.classList.add('user-item__action');
    userItemAction.classList.add('user-action');
    tr.appendChild(userItemAction);

    let i = document.createElement('i');
    i.classList.add('fas');
    i.classList.add('fa-ellipsis-v');
    i.addEventListener('click', toggleActionList);
    userItemAction.appendChild(i);

    let userActionList = document.createElement('ul');
    userActionList.classList.add('user-action__list');
    userActionList.dataset.index = index;
    userItemAction.appendChild(userActionList);

    let userActionEdit = document.createElement('li');
    userActionEdit.classList.add('user-action__item');
    userActionEdit.classList.add('user-action__edit');
    userActionEdit.addEventListener('click', editUserSingle);
    userActionEdit.innerHTML = 'edit';
    userActionList.appendChild(userActionEdit);

    let userActionSave = document.createElement('li');
    userActionSave.classList.add('user-action__item');
    userActionSave.classList.add('user-action__save');
    userActionSave.addEventListener('click', saveUserSingle);
    userActionSave.innerHTML = 'save';
    userActionList.appendChild(userActionSave);

    table.insertAdjacentElement('beforeend', tr);
  });
}

function toggleActionList(e) {
  const list = e.target.parentElement.querySelector('.user-action__list');
  const listAll = document.querySelectorAll('.user-action__list_active');

  if (list.classList.contains('user-action__list_active')) {
    list.classList.remove('user-action__list_active');
  } else {
    listAll.forEach(val => {
      val.classList.remove('user-action__list_active');
    });
    list.classList.add('user-action__list_active');
  }
}

function editUserSingle(e) {
  const itemIndex = this.parentElement.dataset.index;
  const itemList = document.querySelectorAll('.user__item');
  let item = itemList[itemIndex];

  const emailInput = item.querySelector('[name=email]');
  const statusSelect = item.querySelector('[name=status]');

  if (item.classList.contains('user-item_edit')) {
    item.classList.remove('user-item_edit');

    emailInput.setAttribute('disabled', true);
    statusSelect.setAttribute('disabled', true);
  } else {
    item.classList.add('user-item_edit');

    emailInput.removeAttribute('disabled');
    statusSelect.removeAttribute('disabled');
  }
}

async function saveUserSingle(e) {
  const itemIndex = this.parentElement.dataset.index;
  const itemList = document.querySelectorAll('.user__item');

  let item = itemList[itemIndex];

  const emailInput = item.querySelector('[name=email]');
  const statusSelect = item.querySelector('[name=status]');

  const emailInputValue = emailInput.value;
  const statusSelectValue = parseInt(statusSelect.value);

  const { id, email, status } = JSON.parse(item.dataset.content);

  if (emailInputValue === email && statusSelectValue === status) {
    this.parentElement.classList.remove('user-action__list_active');
    return PopNoty({ type: 'alert', message: 'Сохранение отменено, данные остались в изначальном виде' });
  }

  let obj = { id };

  if (email !== emailInputValue) obj.email = emailInputValue;
  if (status !== statusSelectValue) obj.status = statusSelectValue;

  try {
    const res = await fetch('/user', {
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

    if (json.id) {
      this.parentElement.classList.remove('user-action__list_active');
      if (item.classList.contains('user-item_edit')) {
        item.classList.remove('user-item_edit');

        emailInput.setAttribute('disabled', true);
        statusSelect.setAttribute('disabled', true);

        let content = JSON.parse(item.dataset.content);

        content.email = emailInputValue;
        content.status = statusSelectValue;

        item.dataset.content = JSON.stringify(content);
      }

      PopNoty({ type: 'alert', message: `Пользователь с id ${json.id} был изменён` });
    }
  } catch (e) {
    return PopNoty({ type: 'error', message: e.message });
  }
}
