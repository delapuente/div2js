var programSelector = document.querySelector('select');
var reloadButton = document.querySelector('button');

reloadButton.onclick = load;
programSelector.onchange = load;

function load(evt) {
  reloadButton.disabled = true;

  var programUrl = evt.target.value;
  if (!programUrl) { return; }

  fetch(programUrl)
  .then(function (response) {
    return response.text();
  })
  .then(function (source) {
    return div2.compile(source);
  })
  .then(function (binary) {
    return div2.load(binary);
  })
  .then(function (program) {
    reloadButton.disabled = false;
    program.run();
  })
  .catch(function (error) {
    console.log(error.message);
  });
};