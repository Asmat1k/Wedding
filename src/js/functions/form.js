export function form() {
  const form = document.getElementById('form'); 
  form.addEventListener('submit', formSend);
}

async function formSend(e) {
  const form = document.getElementById('form'); 
  e.preventDefault();

  // получаеам данные формы
  let formData = new FormData(form);

  let error = formValidate(form);

  if(error === 0) {
    form.classList.add('_sending');
    let response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData
    });
    if(response.ok) {
      let result = await response.json();
      alert(result.message);
      formPreview.innerHTML = '';
      form.reset();
    } else {
      alert('Ошибка');
      console.log('Ошибка в отправке сообщения');
    }
  } else {
    alert('Ошибка в проверке');
  }
}

function formValidate(form) {
  let error = 0;
  let formReq = document.querySelectorAll('._req');
  let formReqLength = formReq.length

  for(let i = 0; i < formReqLength; i += 1) {
    const input = formReq[i];
    formRemoveError(input);
    if(input.classList.contains('_name')) {
      if(nameTest(input)) {
        console.log('в проверке имени')
        formAddError(input);
        error += 1;
      }
    } else if(input.classList.contains('_allergies')) {
      if(input.value === '') {
        input.value = 'Нет';
      }
    } else if(input.value === '') {
      console.log('в проверке длины')
      formAddError(input);
      error += 1;
    }
  }
  
  return error;
}

function formAddError(input) {
  input.parentElement.classList.add('_error');
  input.classList.add('_error');
}

function formRemoveError(input) {
  input.parentElement.classList.remove('_error');
  input.classList.remove('_error');
}

function nameTest(input) {
  if(input.value.length === 0) return true;
  // input.value = input.value.replaceAll(' ', '-')
  // return /^[А-ЯЁ][а-яё]*([-][А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*\s[А-ЯЁ][а-яё]*$/.test(input.value);
}