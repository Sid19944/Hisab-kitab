import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connections: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connections.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_URL || "");
    connections.isConnected = db.connections[0].readyState;
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Connection Failed", error);
    process.exit(1);
  }
}

export default dbConnect;
