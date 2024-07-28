const profilecardd = document.querySelector("#profilecard");
const pinfo = document.querySelector(".profileinfo");

profilecardd.addEventListener("click", () => {
    pinfo.classList.add("profileinfo-popup");
    const crossthird = document.querySelector("#close3");
    crossthird.addEventListener("click", () => {
        pinfo.classList.remove("profileinfo-popup");
    });
});

const viewButtons = document.querySelectorAll(".dpbutton");
const dropdowns = document.querySelectorAll(".dpdropdown");

viewButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        dropdowns.forEach((dropdown, dropdownIndex) => {
            if (index === dropdownIndex) {
                dropdown.classList.toggle("dpdropdown-popup");
            } else {
                dropdown.classList.remove("dpdropdown-popup");
            }
        });
    });
});

// Select all buttons with the class 'follow'
const followbuttons = document.querySelectorAll('.follow');

// Add a click event listener to each button
followbuttons.forEach(button => {
    button.addEventListener("click", async () => {
        try {
            // Reset all buttons to the 'follow' state
            followbuttons.forEach(btn => {
                btn.classList.remove("unfollow");
                btn.innerText = "Follow";
            });

            // Set the clicked button to the 'unfollow' state
            button.classList.add("unfollow");
            button.innerText = "Unfollow";

            const dietPlanName = button.parentElement.querySelector("h3").textContent;
            const userId = getUserId(); // Replace with function to get user ID

            // Send a POST request to update user's diet plan in MongoDB
            const response = await fetch('/updateDietPlan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, dietPlanName })
            });

            if (!response.ok) {
                throw new Error('Failed to update diet plan');
            }

            // Display the selected diet plan name on the user profile
            document.getElementById("dietplanchosen").innerText = "Diet Plan: " + dietPlanName.slice(0, -1);

            alert("Diet plan updated successfully!");

        } catch (error) {
            console.error('Error updating diet plan:', error);
            alert("Failed to update diet plan. Please try again.");
        }
    });
});

function getUserId() {
    // Implement a function to get the current user's ID
    // This could be fetched from local storage or your backend session
    // For example:
    return 'user123'; // Replace with actual user ID retrieval logic
}
