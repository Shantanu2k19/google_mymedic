import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";

export const fetchUserInfo = async (usrName: string)=> {
  try {
    await connectMongodb();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to the database at the moment!");
  }

  try {
    const usr = await User.findOne({ username: usrName }).lean();

    if (!usr) {
      console.error("User not found");
      throw new Error("User not found");
    }

    return usr;

  } catch (error: any) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw new Error("An error occurred while fetching the user information");
  }
};
