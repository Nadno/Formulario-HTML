import { setErrorFor, unsetErrorFor } from "./setError.js";
import {
  biggerOrEqualThan,
  lessOrEqualThan,
  notEmpty,
  isEqual,
  validPattern,
} from "./validData.js";

const ACTUAL_YEAR = new Date().getFullYear();
const EMPTY = "empty";
const INVALID = "invalid";

const patternFor = {
  email: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/,
  confirm: /^[a-zA-Z-0-9]{6,30}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
  phone: /\d{2}\s\9\d{4}\-\d{4}/,
};

const validation = {
  gender: function (value) {
    const genders = ["M", "F"];
    return genders.includes(value);
  },
  
  birth: function (value, field) {
    const [year] = value.split("-");
    const MIN_YEAR = biggerOrEqualThan(year, 1950);
    const MAX_YEAR = lessOrEqualThan(year, ACTUAL_YEAR);
    const MIN_YEARS_OLD = biggerOrEqualThan(ACTUAL_YEAR - year, 13);

    if (!MIN_YEAR()) return setErrorFor(field, "min");
    if (!MAX_YEAR()) return setErrorFor(field, "max");
    if (!MIN_YEARS_OLD()) return setErrorFor(field, "minYearsOld");
    unsetErrorFor(field);
    return true;
  },

  default: function (value, field) {
    if (patternFor[field]) {
      const tests = [
        [notEmpty(value), EMPTY],
        [validPattern(patternFor[field], value), INVALID],
      ];
      return tests.every(([valid, error]) => {
        if (!valid()) {
          setErrorFor(field, error);
          return false;
        }
        unsetErrorFor(field);
        return true;
      });
    }

    if (notEmpty(value)()) {
      unsetErrorFor(field);
      return true;
    }
    setErrorFor(field, EMPTY);
    return false;
  },

  confirm: function (confirm, field) {
    const password = document.querySelector("#password").value;
    const tests = [
      [notEmpty(confirm), EMPTY],
      [validPattern(patternFor[field], confirm), INVALID],
      [isEqual(confirm, password), "notEqual"],
    ];

    return tests.every(([valid, error]) => {
      if (!valid()) {
        setErrorFor(field, error);
        return false;
      }
      unsetErrorFor(field);
      return true;
    });
  },
};

export default validation;
