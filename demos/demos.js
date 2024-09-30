const programSelector = document.querySelector("select");
const reloadButton = document.querySelector("button");
const demoSource = document.querySelector("#demo-source");
const runButton = document.querySelector("#run");
const shortcutsTip = document.querySelector("#shortcuts");

runButton.onclick = run;
reloadButton.onclick = load;
programSelector.onchange = load;
demoSource.onkeypress = (event) => {
  if (event.ctrlKey && event.key === "Enter") {
    run();
  }
};

function load() {
  reloadButton.disabled = true;
  runButton.disabled = true;

  const programUrl = document.querySelector("#demo-list").value;
  if (!programUrl) {
    return;
  }

  fetch(programUrl)
    .then(function (response) {
      return response.text();
    })
    .then(function (source) {
      demoSource.value = source;
      run();
    });
}

function run() {
  const source = demoSource.value.trim();
  if (!source) {
    return;
  }
  const binary = div2.compile(source);
  div2
    .load(binary, { rootUrl: "" })
    .then((program) => {
      reloadButton.disabled = false;
      runButton.disabled = false;
      shortcutsTip.removeAttribute("hidden");
      program.start();
    })
    .catch((error) => console.log(error.message));
}
