const inputOne = document.getElementById("first-filter");
const inputTwo = document.getElementById("second-filter");
const confirmButton = document.getElementById("button-confirm");
const output = document.getElementById("output");
const title = document.getElementById("title");

title.addEventListener("mouseenter", () => {
  title.style.color = "#4a90e2";
  title.style.letterSpacing = "2px";
});

title.addEventListener("mouseleave", () => {
  title.style.color = "";
  title.style.letterSpacing = "";
});

confirmButton.addEventListener("click", () => {
  if (inputOne.value === "" || inputTwo.value === "") {
    output.innerHTML = "<p>Insert valid characters</p>";
  } else if (inputOne.value === inputTwo.value) {
    output.innerHTML = "<p>Password Verified!</p>";
  } else {
    output.innerHTML = "<p>Wrong Match</p>";
  }
});
