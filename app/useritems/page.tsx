"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { getItem } from "../server/getItem";
import { Item } from "@prisma/client";
import removeAllItem from "../server/removeItem";
import getUserItem from "../server/getUserItem";

const UserItems = () => {
  const { user } = useUser();
  const [itemData, setItemData] = useState<Item[]>();
  const [userItems, setUserItems] = useState<Item[]>();

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

  return (
    <div className="flex justify-center gap-4 pt-10">
      <span>{itemData?.length.toString()}</span>
      <div className="flex flex-wrap w-1/2">
        {userItems?.map((item) => (
          <div key={item.id}>
            <h1>User ID: {item.userId}</h1>
            <div className="flex flex-wrap">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap w-1/2">
        {itemData?.map((item, index) => (
          <div key={index}>
            <h1>{item.name}</h1>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-1/3 items-center p-4 gap-4">
        <button
          className="flex max-h-10 bg-violet-400 px-4 py-2 rounded-lg text-white"
          onClick={getItemData}
        >
          Get All Items
        </button>

        <button
          className="flex max-h-10 bg-blue-400 px-4 py-2 rounded-lg text-white"
          onClick={async () => {
            if (user) {
              setUserItems(await getUserItem(user?.id));
            }
          }}
        >
          Get User Item
        </button>

        <button
          className="flex max-h-10 bg-red-700 px-4 py-2 rounded-lg text-white"
          onClick={() => {
            if (user) removeAllItem(user?.id);
          }}
        >
          Delete All
        </button>
      </div>
    </div>
  );
};

export default UserItems;
