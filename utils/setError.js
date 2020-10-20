const getSpanError = (field) =>
  document.querySelector(`#${field}`).parentNode.querySelector(".input__error");

export const setErrorFor = (field, error) => {
  getSpanError(field).innerHTML = customMessage(field, error);
  getSpanError(field).classList.add("active");
};

export const unsetErrorFor = (field) => {
  getSpanError(field).innerHTML = "";
  getSpanError(field).classList.remove("active");
}

function customMessage(field, error) {
  const messages = {
    default: {
      empty: "Por favor, preencha este campo",
      invalid: "Valor inválido",
    },
    birth: {
      min: "O ano mínimo permitido é 1950",
      max: "Não pode escolher um ano a frente do atual",
      minYearsOld: "Você deve ter no mínimo 13 anos",
    },
    email: {
      empty: "E-mail é obrigatório",
      invalid: "E-mail inválido",
    },
    phone: {
      empty: "Celular obrigatório",
      invalid: "Celular inválido, siga corretamente o exemplo",
    },
    password: {
      empty: "Senha é obrigatória",
    },
    confirm: {
      empty: "Confirme sua senha",
      invalid:
        "A senha precisa ter no mínimo 8 dígitos, sem caracteres inválidos",
      notEqual: "As senhas não coincidem",
    },
  };

  if (messages[field]) return messages[field][error];
  return messages["default"][error];
}