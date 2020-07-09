
export function showPage (selector) {
  Array.from(document.querySelectorAll('.page'))
    .forEach(el => (el === document.querySelector(selector)) ? el.classList.remove('hide') : el.classList.add('hide'))
}