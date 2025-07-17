/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import axiosInstance from "@/lib/axiosInstance";

// by mistake i namne this home page but this will show all the page
export const getBooks = async () => {
    // const access_token = (await cookies()).get("accessToken")?.value;
    try {
      const res = await axiosInstance.get("/allBooks", {
        headers: {
          //   Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });
  
      return res.data;
    } catch (error:any) {
      throw new Error(error.response.data.message);
    }
  };