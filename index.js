import validation from './utils/validation.js';

const form = document.querySelector('form');
const fields = form.querySelectorAll("input");

const validateField = (field) => {
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid)
        foundError = error;
    }

    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Por favor, preencha este campo",
      },
      email: {
        valueMissing: "E-mail é obrigatório",
        typeMismatch: "E-mail inválido",
      },
      password: {
        valueMissing: "Preencha este campo"
      }
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector('.input__error');
    if (message) {
      spanError.classList.add('active');
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove('active');
      spanError.innerHTML = message;
    }
  }

  return function() {
    const error = verifyErrors();
    console.log(error)
    if (error) {
      const message = customMessage(error);
      setCustomMessage(message);

      field.style.borderColor = "red";
    } else {
      field.style.borderColor = "green";
      setCustomMessage("");
    }
  };
};

const customValidation = ({ target }) => {
  const field = target;

  const validation = validateField(field);
  validation();
};

for ( let field of fields ) {  
  if (!validation[field.id]) {
    field.addEventListener("blur", ({ target }) => {
      validation["default"](field.value, field.id);
    });
    continue;
  }
  
  field.addEventListener("blur", ({ target }) => {
    validation[field.id](field.value, field.id);
  });
}


form.onsubmit = (event) => {
  event.preventDefault();
  let error = false;

  for (let field of fields) {
    if (!validation[field.id]) {
      if (!validation["default"](field.value, field.id)) error = true;
      continue;
    }
    
    
    if (!validation[field.id](field.value, field.id)) error = true;
  }

  return alert(
    error
      ? "Preencha todos os campos corretamente!"
      : "Conta criada com sucesso!"
  )
};