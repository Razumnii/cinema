getUsers();
async function getUsers() {
  try {
    const res = await fetch('/api/user', {
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

  table.innerHTML = ''

  if (userArr < 1) {
    return (table.innerHTML += '<div style="text-align: center;margin: 0 auto;">Not data</div>');
  }

  userArr.forEach((obj, index) => {
    let { id, email, status, ts_create } = obj;

    const tr = document.createElement('tr');
    tr.classList.add('user__item');
    tr.classList.add('user-item');
    tr.dataset.index = index;
    tr.dataset.id = id;
    tr.dataset.content = JSON.stringify(obj);

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

    tr.innerHTML += `<td class="user-item__password"> <input name="password" placeholder="Password" type="text" disabled></td>`;
    tr.innerHTML += `<td class="user-item__ts_create" name="ts_create">${moment(ts_create).format(
      'YYYY-MM-DD HH:mm'
    )}</td>`;

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

    let userActionDelete = document.createElement('li');
    userActionDelete.classList.add('user-action__item');
    userActionDelete.classList.add('user-action__delete');
    userActionDelete.addEventListener('click', deleteUserSingle);
    userActionDelete.innerHTML = 'delete';
    userActionList.appendChild(userActionDelete);

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

function editUserSingle() {
  const itemIndex = this.parentElement.dataset.index;
  const itemList = document.querySelectorAll('.user__item');
  let item = itemList[itemIndex];

  const emailInput = item.querySelector('[name=email]');
  const statusSelect = item.querySelector('[name=status]');
  const passwordInput = item.querySelector('[name=password]');

  if (item.classList.contains('user-item_edit')) {
    item.classList.remove('user-item_edit');

    emailInput.setAttribute('disabled', true);
    statusSelect.setAttribute('disabled', true);
    passwordInput.setAttribute('disabled', true);
  } else {
    item.classList.add('user-item_edit');

    emailInput.removeAttribute('disabled');
    statusSelect.removeAttribute('disabled');
    passwordInput.removeAttribute('disabled');
  }
}

async function saveUserSingle(e) {
  const itemIndex = this.parentElement.dataset.index;
  const itemList = document.querySelectorAll('.user__item');

  let item = itemList[itemIndex];

  const emailInput = item.querySelector('[name=email]');
  const statusSelect = item.querySelector('[name=status]');
  const passwordInput = item.querySelector('[name=password]');

  const emailInputValue = emailInput.value;
  const statusSelectValue = parseInt(statusSelect.value);
  const passwordInputValue = passwordInput.value;

  const { id, email, status } = JSON.parse(item.dataset.content);

  if (emailInputValue === email && statusSelectValue === status && !passwordInputValue) {
    this.parentElement.classList.remove('user-action__list_active');
    return PopNoty({ type: 'alert', message: 'Сохранение отменено, данные остались в изначальном виде' });
  }

  let obj = {};

  if (email !== emailInputValue) obj.email = emailInputValue;
  if (status !== statusSelectValue) obj.status = statusSelectValue;
  if (passwordInputValue) obj.password = passwordInputValue;

  try {
    const res = await fetch(`/api/user/${id}`, {
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
      this.parentElement.classList.remove('user-action__list_active');
      if (item.classList.contains('user-item_edit')) {
        item.classList.remove('user-item_edit');

        emailInput.setAttribute('disabled', true);
        statusSelect.setAttribute('disabled', true);
        passwordInput.value = '';
        passwordInput.setAttribute('disabled', true);

        let content = JSON.parse(item.dataset.content);

        content.email = emailInputValue;
        content.status = statusSelectValue;

        item.dataset.content = JSON.stringify(content);
      }

      PopNoty({ type: 'alert', message: `Пользователь с id ${id} был изменён` });
    }
  } catch (e) {
    return PopNoty({ type: 'error', message: e.message });
  }
}

async function deleteUserSingle(e) {
  const itemIndex = this.parentElement.dataset.index;
  const itemList = document.querySelectorAll('.user__item');
  const item = itemList[itemIndex];

  const {id} = item.dataset;

  console.log(id);

  try {
    const res = await fetch(`/api/user/${id}`, {
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
      item.parentNode.removeChild(item)

      PopNoty({ type: 'alert', message: `Пользователь с id ${id} был удалён` });
    }
  } catch (e) {
    return PopNoty({ type: 'error', message: e.message });
  }
}
