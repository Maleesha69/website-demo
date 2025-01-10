const getElement = (selector) => {
  const element = document.querySelector(selector)

  if (element) return element
  throw Error(
    `Please double check your class names, there is no ${selector} class`
  )
}

const links = getElement('.nav-links')
const navBtnDOM = getElement('.nav-btn')

navBtnDOM.addEventListener('click', () => {
  links.classList.toggle('show-links')
})

const date = getElement('#date')
const currentYear = new Date().getFullYear()
date.textContent = currentYear

/* comment section */
document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("comment-form");
  const commentsContainer = document.getElementById("comments-container");
  const recipeId = 1; // Replace with the actual recipe ID (dynamic or hardcoded)

  // Fetch comments for the recipe
  const fetchComments = async () => {
    const response = await fetch(`comments.php?recipe_id=${recipeId}`);
    const comments = await response.json();

    // Clear the container
    commentsContainer.innerHTML = "";

    // Display comments
    comments.forEach(comment => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `
        <h5>${comment.username}</h5>
        <p>${comment.comment}</p>
        <small>${new Date(comment.created_at).toLocaleString()}</small>
      `;
      commentsContainer.appendChild(commentElement);
    });
  };

  // Handle comment submission
  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const commentText = document.getElementById("comment-text").value;

    const response = await fetch("comments.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        recipe_id: recipeId,
        username: username,
        comment: commentText
      })
    });

    const result = await response.json();
    if (result.success) {
      commentForm.reset();
      fetchComments(); // Refresh comments
    } else {
      alert("Error: " + result.message);
    }
  });

  // Initial fetch
  fetchComments();
});




/*login*/
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerBtn = document.getElementById("register-btn");

  // Dummy user credentials
  const validUsername = "testuser";
  const validPassword = "password123";

  // Handle login form submission
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from submitting

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if login details are correct
    if (username === validUsername && password === validPassword) {
      alert("Login successful!");
      window.location.href = "index.html"; // Redirect to the home page
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });

  // Redirect to registration page
  registerBtn.addEventListener("click", () => {
    window.location.href = "registration.html"; // Redirect to the registration page
  });
});

/*registration*/
document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registration-form");

  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Get form values
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // For now, log the values (later, send to server or store locally)
    console.log("Registration Details:");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);

    alert("Registration Successful!");
    registrationForm.reset(); // Clear the form
  });
});


