import Quill from 'quill'

let quill = new Quill('#editor');
const boldButton = document.querySelector('#bold-btn');
const getButton = document.querySelector('#get-btn');

boldButton.addEventListener('click', () => {
  console.log('click bold');
  const result = quill.format('bold', true);
});

getButton.addEventListener('click', () => {
  console.log('click get');
  const result = quill.getFormat();
  console.log(result);
});

quill.on('editor-change', function(delta, oldDelta, source) {
  console.log(oldDelta)
});

