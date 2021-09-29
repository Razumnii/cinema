document.querySelector('[type=submit]').addEventListener('click', async function (event) {
  event.preventDefault();

  const user = {
    email: document.querySelector('[name=email]').value,
    password: document.querySelector('[name=password]').value,
  };

  const response = await fetch('/security/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  });

  const result = await response.json();

  const { ok, status } = response;

  if (ok) {
    document.location = '/';
  }
});
