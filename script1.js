// frontend/script1.js

// Event listener for signup button click
document.getElementById('signinbut1').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission

    const url = 'http://localhost:3000/signup'; // Update with your backend endpoint

    const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            height: parseInt(document.getElementById('height').value),
            weight: parseInt(document.getElementById('weight').value),
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    };

    fetch(url, postData)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Handle success response from backend
            updateProfileDropdown(data.name);
            displayUserData(data);
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error from backend
        });
});

// Event listener for login button click
const signInButton = document.getElementById("signinbut");

signInButton.addEventListener("click", async () => {
    const email = document.getElementById("signedincheck").value;
    const password = document.getElementById("passwordcheck").value;

    const url = 'http://localhost:3000/login';

    const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    };

    try {
        const response = await fetch(url, postData);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Success:', data);
        alert('Signed in successfully!'); // Display success message
        updateProfileDropdown(data.name);
        displayUserData(data); // Call the function to display user data
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to sign in. Check your credentials.'); // Display error message
    }
});

// Function to display user data
function displayUserData(user) {
    document.getElementById('namevalue').innerText = 'Name: ' + user.name;
    document.getElementById('emailvalue').innerText = 'Email: ' + user.email;
    document.getElementById('heightvalue').innerText = 'Height: ' + user.height + 'cm';
    document.getElementById('weightvalue').innerText = 'Weight: ' + user.weight + 'Kg';
    document.getElementById('bmi').innerText = 'BMI: ' + calculateBMI(user.height, user.weight);
    document.getElementById('workoutplanchosen').innerText = 'Workout Plan: ' + (user.workoutPlan || 'Not selected');
    document.getElementById('dietplanchosen').innerText = 'Diet Plan: ' + (user.dietPlan || 'Not selected');
}

// Function to calculate BMI
function calculateBMI(height, weight) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
}

// Function to update profile dropdown menu
function updateProfileDropdown(userName) {
    const profileDropdown = document.querySelectorAll('.dropdown')[2]; // Get the third dropdown
    const headButton = profileDropdown.querySelector('.head');
    const dropdownContent = profileDropdown.querySelector('.dropdown-content');
    
    headButton.innerHTML = `<b><i class="fa-solid fa-user"></i> ${userName}</b>`;
    dropdownContent.innerHTML = `
        <a id="profilecard">MY PROFILE</a>
        <a id="logout">LOGOUT</a>
        <a id="aboutcard">ABOUT</a>
    `;

    document.getElementById('logout').addEventListener('click', function() {
        location.reload(); // Refresh the page on logout
    });

    document.getElementById('profilecard').addEventListener('click', function() {
        document.querySelector('.profileinfo').classList.add('profileinfo-popup');
    });

    document.getElementById('close3').addEventListener('click', function() {
        document.querySelector('.profileinfo').classList.remove('profileinfo-popup');
    });
}

// Add event listeners for new profile card and about card
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('profilecard').addEventListener('click', function() {
        document.querySelector('.profileinfo').classList.add('profileinfo-popup');
    });
    document.getElementById('close3').addEventListener('click', function() {
        document.querySelector('.profileinfo').classList.remove('profileinfo-popup');
    });
});
