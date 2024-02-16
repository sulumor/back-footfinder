export const lettersRegex = /[A-Za-zÀ-ÿ]/;
export const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/;
export const logPasswordRegex = /^[a-zA-Z0-9\W]{8,}$/;
export const scoreRegex = /^\d+-\d+$/;
export const fitnessRegex = /^En forme|absent|blesse$/;
