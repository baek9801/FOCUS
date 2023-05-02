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

export function shortenedTitle(title: string) {
  const maxLength = 45;
  return title.length > maxLength
    ? title.substring(0, maxLength - 3) + "..."
    : title;
}
