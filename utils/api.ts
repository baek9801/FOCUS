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

export function shortenedString(title: string, maxLength: number) {
  return title.length > maxLength
    ? title.substring(0, maxLength - 3) + "..."
    : title;
}

export async function saveUserData(userData: any) {
  try {
    const response = await fetch("/api/setUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to save user data in cookie");
    }

    console.log("User data saved in cookie");
  } catch (error) {
    console.error("Error saving user data in cookie:", error);
  }
}
