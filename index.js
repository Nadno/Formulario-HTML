const form = document.querySelector('form');
const fields = document.querySelectorAll("[required]");

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
      }
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector('span.error');
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
  field.addEventListener("invalid", event => {
    event.preventDefault();

    customValidation(event);
  });
  field.addEventListener("blur", customValidation);
}







form.onsubmit = (event) => {
  event.preventDefault();
  console.log("envia o form");
};