"use server";

import { connectMongodb } from "@/app/api/mongodb";
import { User_info } from "@/types/user";
import { FetchUserInfoResponse } from "@/types/response"

import User, { IUser, UserUpdate } from "@/models/user";
import { formatDate } from "@/app/api/utils"


export const fetchUserInfo = async (usrEmail: string): Promise<FetchUserInfoResponse>  => {
  try {
    await connectMongodb();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return { success: false, message: "Error fetching details at the moment!" };
  }

  console.log("fetching details of : ",usrEmail)

  try {
    const usr = await User.findOne({ email: usrEmail }).lean<IUser>();

    if (!usr) {
      console.error("User not found");
      return { success: false, message: "User not found" };
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

      return { success: true, data: userInfo };

  } catch (error: any) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
    } else if (error.request) {
      console.error('Error request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    return { success: false, message: `An error occurred!` };
  }
};

export const updateUserDetails = async (usrEmail: string, updateData: UserUpdate): Promise<FetchUserInfoResponse>  => {

  console.log("updating details for-",usrEmail);
  if(usrEmail === 'demo@gmail.com')
    return { success: false, message: "Disabled for demo user! Please login" };

  try {
    await connectMongodb();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return { success: false, message: "Error updating details at the moment!" };
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: usrEmail }, // Query to find the user by email
      { $set: updateData }, // Data to update
      { new: true, lean: true } // Options: return the updated document, use lean for plain JS object
    ).exec() as IUser;

    if (updatedUser===null) {
      return { success: false, message: "User not found!" };
    }

    const userInfo: User_info = {
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      image: updatedUser.image,
      age: updatedUser.age,
      gender: updatedUser.gender,
      created: formatDate(updatedUser.createdAt),
    };

    return { success: true, data: userInfo};
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, message: "Error updating details at the moment!" };
  }
}