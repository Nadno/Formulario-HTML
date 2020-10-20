import validation from './utils/validation.js';

const form = document.querySelector('form');
const fields = form.querySelectorAll("input");

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