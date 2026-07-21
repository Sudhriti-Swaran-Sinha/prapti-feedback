const question = document.getElementById("question");
const count = document.getElementById("count");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

// Replace this later
const API_URL = "https://script.google.com/macros/s/AKfycbyXqJuSjaPY-zu38xfpjOeEgAJGaZAU3h5AgOjYtYEOSxMTa4G6ojSCtog-huIOFyii/exec";

// Character counter
question.addEventListener("input", () => {
    count.textContent = `${question.value.length} / 500`;
});

// Submit question
submitBtn.addEventListener("click", async () => {

    const text = question.value.trim();

    if (text === "") {
        alert("Please enter a question.");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "submit",
                question: text
            })
        });

        const result = await response.json();

        if (result.success) {
            message.textContent = "✅ Question submitted successfully!";
            question.value = "";
            count.textContent = "0 / 500";
        } else {
            message.style.color = "red";
            message.textContent = "Something went wrong.";
        }

    } catch (error) {
        console.error("Error submitting question:", error);
        message.style.color = "red";
        message.textContent = "Unable to connect to server.";

    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Question";

});