document.addEventListener("DOMContentLoaded", () => {
  // Employment Section Toggle
  const employmentSection = document.getElementById("employmentSection");
  const employedRadios = document.querySelectorAll('input[name="currentlyEmployed"]');

  function toggleEmployment(show) {
    if (show) {
      employmentSection.classList.remove("hidden");
    } else {
      employmentSection.classList.add("hidden");
      employmentSection.querySelectorAll("input, textarea").forEach((el) => (el.value = ""));
    }
  }

  employedRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      toggleEmployment(e.target.value === "yes");
    });
  });

  const checkedRadio = Array.from(employedRadios).find((r) => r.checked);
  toggleEmployment(checkedRadio?.value === "yes");

  // Google Sheets Form Submission
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwdvJYddpCEjcF2TRIzBN-yoCyNSGVb3y772TyH56CQW26pArLhXuhjCutx8CvE6NsAWA/exec';
  const form = document.forms['google-sheet'];
  const spinner = document.getElementById("spinner");
  const successMessage = document.getElementById("successMessage");

  // Get availability days
  function getSelectedAvailability() {
    return Array.from(form.querySelectorAll('input[name="Availability"]:checked'))
      .map(el => el.value)
      .join(', ');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    spinner.style.display = "block";
    successMessage.style.display = "none";

    const formData = new FormData(form);
    const selectedDays = getSelectedAvailability();
    formData.set('Availability', selectedDays); // Append merged days

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => {
        spinner.style.display = "none";
        successMessage.style.display = "block";
        form.reset();
        toggleEmployment(false); // hide employment section if visible
      })
      .catch(error => {
        spinner.style.display = "none";
        console.error('Error!', error.message);
        alert("There was an error submitting your form. Please try again.");
      });
  });
});
