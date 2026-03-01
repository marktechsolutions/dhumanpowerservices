
// ===============================
// DHU Multimanpower - Form Handler
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    if (!form) return;

    const submitBtn = form.querySelector("button[type='submit']");
    const formMessage = document.createElement("div");
    formMessage.className = "form-message";
    form.appendChild(formMessage);

    // Basic Email Regex Validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        formMessage.innerHTML = "";
        formMessage.style.color = "red";

        const name = form.querySelector("input[name='name']").value.trim();
        const email = form.querySelector("input[name='email']").value.trim();
        const message = form.querySelector("textarea[name='message']").value.trim();

        // ===============================
        // VALIDATION
        // ===============================

        if (name.length < 3) {
            formMessage.innerHTML = "Please enter a valid name.";
            return;
        }

        if (!isValidEmail(email)) {
            formMessage.innerHTML = "Please enter a valid email address.";
            return;
        }

        if (message.length < 10) {
            formMessage.innerHTML = "Message must be at least 10 characters.";
            return;
        }

        // ===============================
        // LOADING STATE
        // ===============================

        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";

        try {
            const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });

            if (response.ok) {
                formMessage.style.color = "green";
                formMessage.innerHTML = "Thank you! Your inquiry has been sent successfully.";
                form.reset();
            } else {
                throw new Error("Form submission failed.");
            }

        } catch (error) {
            formMessage.style.color = "red";
            formMessage.innerHTML = "Something went wrong. Please try again later.";
        }

        submitBtn.disabled = false;
        submitBtn.innerText = "Submit";
    });

});
