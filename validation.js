const actualYear = new Date().getFullYear();

const EMPTY = "empty";
const INVALID = "invalid";

const patternFor = {
  confirm: /^[a-zA-Z-0-9]{6,30}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
  phone: /\d{2}\s\9\d{4}\-\d{4}/,
};

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

const validTests = ([valid, passError]) => {
  if (!valid()) {
    
    return false;
  };
  return true;
};

const validPattern = (pattern, value) =>
  () => new RegExp(pattern).test(value);
const isEqual = (firstValue, secondValue) =>
  () => firstValue === secondValue;
const lessOrEqualThan = (firstValue, secondValue) => 
  () => firstValue <= secondValue;
const biggerOrEqualThan = (firstValue, secondValue) => 
  () => firstValue >= secondValue;
const notEmpty = (value) => 
  () => value.trim() !== "";

const validation = {
  gender: function (value) {
    const genders = ["M", "F"];
    return genders.includes(value);
  },
  birth: function (value) {
    const [year] = value.split("-");
    const MIN_YEAR = biggerOrEqualThan(year, 1950);
    const MAX_YEAR = lessOrEqualThan(year, actualYear);
    const MIN_YEARS_OLD = biggerOrEqualThan((actualYear - year), 13);

    return MIN_YEAR() && MAX_YEAR() && MIN_YEARS_OLD();
  },
  default: function (value, field) {
    if (patternFor[field]) {
      const tests = [
        [notEmpty(value), EMPTY],
        [validPattern(patternFor[field], value), INVALID],
      ];
      return tests.every(validTests)
    };
    return notEmpty(value)();
  },
  confirm: function (confirm, field) {
    const password = document.querySelector("#password").value;
    const tests = [
      [notEmpty(confirm), EMPTY],
      [validPattern(patternFor[field], confirm), INVALID],
      [isEqual(confirm, password), "notEqual"],
    ];

    return tests.every(validTests);
  },
};

export default validation;