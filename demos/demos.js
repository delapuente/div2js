const programSelector = document.querySelector("select");
const reloadButton = document.querySelector("button");
const demoSource = document.querySelector("#demo-source");

reloadButton.onclick = load;
programSelector.onchange = load;

function load() {
  reloadButton.disabled = true;

  const programUrl = document.querySelector("#demo-list").value;
  if (!programUrl) {
    reloadButton.disabled = false;
    return;
  }

  fetch(programUrl)
    .then(function (response) {
      return response.text();
    })
    .then(function (source) {
      demoSource.innerHTML = source;
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
}
