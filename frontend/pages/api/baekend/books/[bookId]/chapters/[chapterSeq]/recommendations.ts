import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const tracks = [
      {
        artist: "Grover Washington, Jr.",
        id: "5fdNHVZHbWB1AaXk4RBGVD",
        name: "Just the Two of Us",
      },
      {
        artist: "Grover Washington, Jr.",
        id: "5fdNHVZHbWB1AaXk4RBGVD",
        name: "Just the Two of Us",
      },
      {
        artist: "Grover Washington, Jr.",
        id: "5fdNHVZHbWB1AaXk4RBGVD",
        name: "Just the Two of Us",
      },
      {
        artist: "Grover Washington, Jr.",
        id: "5fdNHVZHbWB1AaXk4RBGVD",
        name: "Just the Two of Us",
      },
      {
        artist: "Grover Washington, Jr.",
        id: "5fdNHVZHbWB1AaXk4RBGVD",
        name: "Just the Two of Us",
      },
    ];

    res.status(200).json({ tracks });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
