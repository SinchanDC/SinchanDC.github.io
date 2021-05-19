
function searchToggle(obj, evt) {
  var container = $(obj).closest('.search-wrapper');
  if (!container.hasClass('active')) {
    container.addClass('active');
    evt.preventDefault();
  } else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
    container.removeClass('active');

    container.find('.search-input').val('');
  }
}
let searchable = [
  'Assam',
  'Bhopal',
  'Bihar',
  'Chandigarh',
  'Chennai',
  'Delhi',
  'Indore',
  'Maharashtra',
  'Telengana',
  'West Bengal'
];
input-holder
const searchInput = document.getElementById('search');
const searchWrapper = document.querySelector('.input-holder');
const resultsWrapper = document.querySelector('.results');

searchInput.addEventListener('keyup', () => {
  let results = [];
  let input = searchInput.value;
  if (input.length) {
    results = searchable.filter((item) => {
      return item.toLowerCase().includes(input.toLowerCase());
    });
  }
  renderResults(results);
});

function renderResults(results) {
  if (!results.length) {
    return searchWrapper.classList.remove('show');
  }

  const content = results
    .map((item) => {
      return `<li>${item}</li>`;
    })
    .join('');

  searchWrapper.classList.add('show');
  resultsWrapper.innerHTML = `<ul>${content}</ul>`;
}
