document.querySelector('[type=submit]').addEventListener('click', async function (event) {
  event.preventDefault();

  const user = {
    email: document.querySelector('[name=email]').value,
    password: document.querySelector('[name=password]').value,
  };

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  });

  const { ok, status } = response;
  const result = await response.json();

  if (status > 399) {
    return PopNoty({ type: 'alert', message });
  }

  if (ok) {
    console.log(document.location);

    if (document.location.pathname !== '/login' && document.location.pathname !== '/login#') {
      document.location.reload();
    } else {
      document.location = '/';
    }
  }
});
