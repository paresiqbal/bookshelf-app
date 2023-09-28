document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");

  function clearForm() {
    document.getElementById("title");
    document.getElementById("author");
    document.getElementById("year");
  }

  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
  });
});
