<?php
$servername = "localhost";
$username = "root"; 
$password = "";     
$dbname = "dishdiary";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $description = $_POST["description"];
    $ingredients = $_POST["ingredients"];
    $steps = $_POST["steps"];
    $imagePath = null;

    // Handle image upload
    if (!empty($_FILES["image"]["name"])) {
        $targetDir = "uploads/";
        $imagePath = $targetDir . basename($_FILES["image"]["name"]);
        if (!move_uploaded_file($_FILES["image"]["tmp_name"], $imagePath)) {
            die("Error uploading the image.");
        }
    }

    // Insert recipe into the database
    $sql = "INSERT INTO recipes (title, description, ingredients, steps, image_path)
            VALUES ('$title', '$description', '$ingredients', '$steps', '$imagePath')";

    if ($conn->query($sql) === TRUE) {
        echo "Recipe uploaded successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
