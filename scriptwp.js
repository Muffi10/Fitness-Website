const profilecardd = document.querySelector("#profilecard");
const pinfo = document.querySelector(".profileinfo");

// Toggle profile info popup
profilecardd.addEventListener("click", () => {
    pinfo.classList.toggle("profileinfo-popup");
});

const tabels = document.querySelectorAll(".tabless");
const viewButtons = document.querySelectorAll(".wpbutton");

// Toggle workout plan tables visibility
viewButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
        tabels.forEach((tabel, ind) => {
            if (i === ind) {
                tabel.classList.toggle("tables-popup");
            } else {
                tabel.classList.remove("tables-popup");
            }
        });
    });
});

const followbuttons = document.querySelectorAll('.followwp');

// Function to save the selected workout plan to the database
async function saveDataToDatabase(workoutPlanName) {
    const url = 'http://localhost:3000/saveWorkoutPlan'; // Replace with your backend endpoint

    const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            workoutPlan: workoutPlanName
            // Add any other data you want to send to the backend
        })
    };

    try {
        const response = await fetch(url, postData);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data saved successfully:', data);
        return data; // Assuming your backend responds with some confirmation data
    } catch (error) {
        console.error('Error saving data:', error);
        throw error;
    }
}

// Function to handle follow button click
function handleFollowButtonClick(button, workoutPlanName) {
    // Save data to database
    saveDataToDatabase(workoutPlanName)
        .then(data => {
            // Update user profile with selected workout plan
            document.getElementById("workoutplanchosen").innerText = "Workout Plan: " + workoutPlanName;
        })
        .catch(error => {
            console.error('Failed to save data:', error);
            alert('Failed to save data. Please try again.');
        });
}

// Add click event listeners to each follow button
followbuttons.forEach(button => {
    button.addEventListener("click", () => {
        const workoutPlanName = button.parentElement.querySelector("h2").textContent;
        handleFollowButtonClick(button, workoutPlanName);
    });
});
