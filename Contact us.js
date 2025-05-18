// Function to add new emergency contact fields
function addEmergencyContact() {
    const newContact = document.createElement("div");
    newContact.classList.add("emergency-contact");

    const newFields = `
        <div class="d-flex align-items-center">
            <input type="text" class="form-control" placeholder="First Name" required>
            <input type="text" class="form-control mx-2" placeholder="Last Name" required>
            <input type="text" class="form-control mx-2" placeholder="Relationship" required>
            <input type="tel" class="form-control mx-2" placeholder="Phone Number" required>
            <button type="button" class="btn btn-danger btn-sm mx-2" onclick="removeContact(this)">-</button>
        </div>
    `;
    newContact.innerHTML = newFields;

    // Append the new contact to the container
    document.getElementById("emergencyContacts").appendChild(newContact);
}

// Function to remove an emergency contact field
function removeContact(button) {
    const contact = button.closest(".emergency-contact");
    contact.remove();
}
