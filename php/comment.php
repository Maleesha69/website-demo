<?php
$servername = "localhost";
$username = "root"; // Default for XAMPP
$password = "";     // Default for XAMPP
$dbname = "dishdiary";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle POST request to add a comment
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $recipe_id = $_POST["recipe_id"]; // Assuming the recipe ID is passed
    $username = $_POST["username"];
    $comment = $_POST["comment"];

    $sql = "INSERT INTO comments (recipe_id, username, comment) VALUES ('$recipe_id', '$username', '$comment')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Comment added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => $conn->error]);
    }
    exit;
}

// Handle GET request to fetch comments for a recipe
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $recipe_id = $_GET["recipe_id"]; // Assuming the recipe ID is passed
    $sql = "SELECT username, comment, created_at FROM comments WHERE recipe_id = '$recipe_id' ORDER BY created_at DESC";

    $result = $conn->query($sql);
    $comments = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }
    }
    echo json_encode($comments);
    exit;
}

$conn->close();
?>
