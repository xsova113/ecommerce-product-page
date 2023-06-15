"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getItem } from "../server/getItem";
import { Item, User } from "@prisma/client";
import { getUser } from "../server/getUser";

const UserItems = () => {
  const { user } = useUser();
  const [itemData, setItemData] = useState<Item[]>();
  //   const [userData, setUserData] = useState<User[]>();

  const getItemData = async () => {
    try {
      if (user) {
        const data = await getItem(user.id);
        setItemData(data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //   const getUserData = async () => {
  //     try {
  //       if (user) {
  //         const data = await getUser(user);
  //         setUserData(data);
  //       }
  //     } catch (error: any) {
  //       console.log(error.message);
  //     }
  //   };

  useEffect(() => {
    getItemData();
    // getUserData();
  }, [user]);
  return (
    <div className="flex justify-center pt-10 w-full">
      {itemData?.length.toString()}
      <ul>
        {itemData?.map((item, index) => (
          <li key={index}>
            <h1>{item.name}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserItems;
