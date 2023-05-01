import axios from "axios";

export async function logout() {
  try {
    const response = await axios.post("/api/logout");
    if (response.status === 200) {
      console.log("Logged out successfully");
      window.location.href = "/loginPage";
    } else {
      console.error("Failed to log out:", response.status, response.statusText);
    }
  } catch (error) {
    if (error instanceof Error)
      console.error("Error during log out:", error.message);
  }
}
