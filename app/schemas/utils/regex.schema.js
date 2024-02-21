export const lettersRegex = /[A-Za-zÀ-ÿ]/;
export const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/;
export const logPasswordRegex = /^[a-zA-Z0-9\W]{8,}$/;
export const scoreRegex = /^\d+-\d+$/;
export const fitnessRegex = /^En forme|absent|blesse$/;
export const roleRegex = /^joueur|recruteur$/;
export const genreRegex = /^masculin|féminin|non-binaire$/;
export const footRegex = /^Droit|Gauche$/;
export const positionRegex = /^Gardien|Libéro|Défenseur gauche|Défenseur droit|Milieu défensif gauche|Milieu défensif droit|Milieu défensif central|Milieu gauche|Milieu droit|Milieu offensif|Ailier gauche|Ailier droit|Attaquant|Avant-centre|Remplaçant$/;
