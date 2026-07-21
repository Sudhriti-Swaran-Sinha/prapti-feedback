const API_URL = "https://script.google.com/macros/s/AKfycbyXqJuSjaPY-zu38xfpjOeEgAJGaZAU3h5AgOjYtYEOSxMTa4G6ojSCtog-huIOFyii/exec";

const tableBody = document.getElementById("tableBody");

// Load all questions when page opens
window.onload = loadQuestions;

async function loadQuestions() {

    tableBody.innerHTML = `
        <tr>
            <td colspan="3" style="text-align:center;">Loading...</td>
        </tr>
    `;

    try {

        const response = await fetch(API_URL + "?action=get");

        const data = await response.json();

        tableBody.innerHTML = "";

        if (data.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center;">No questions found.</td>
                </tr>
            `;
            return;
        }

        data.forEach(q => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${q.id}</td>
                <td>${q.question}</td>
                <td>
                    <span
                        class="${q.status.toLowerCase()}"
                        style="cursor:pointer;"
                        onclick="toggleStatus(${q.id})"
                    >
                        ${q.status}
                    </span>
                </td>
            `;

            tableBody.appendChild(row);

        });

    } catch (e) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;color:red;">
                    Unable to load questions.
                </td>
            </tr>
        `;

    }

}

async function toggleStatus(id) {

    try {

        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "toggle",
                id: id
            })
        });

        loadQuestions();

    } catch (e) {

        alert("Unable to update status.");

    }

}