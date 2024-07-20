"use server";

import { connectMongodb } from "@/lib/mongodb";
import { User_info } from "@/types/user";
import User, { IUser } from "@/models/user";
import { formatDate } from "@/lib/utils"

export const fetchUserInfo = async (usrEmail: string) => {
  try {
    await connectMongodb();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to the database at the moment!");
  }

  console.log("fetching details of : ",usrEmail)

  try {
    const usr = await User.findOne({ email: usrEmail }).lean<IUser>();

    if (!usr) {
      console.error("User not found");
      throw new Error("User not found");
    }

    const userInfo: User_info = {
        name: usr.name,
        username: usr.username,
        email: usr.email,
        image: usr.image,
        age: usr.age,
        gender: usr.gender,
        created: formatDate(usr.createdAt),
      };

    return userInfo;

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
    throw new Error(`An error occurred while fetching the user information: ${error.message}`);
  }
};
