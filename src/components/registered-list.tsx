import React from "react";
import RegisteredEvent from "./registered-event";
import { User, Event } from "@prisma/client";
import prisma from "@/helper/db";

interface UserProps extends User {
  events: Event[];
}

const RegisteredList = async ({ user }: { user: UserProps }) => {
  console.log(user);

  return (
    <div className="bg-slate-600 w-full  h-auto flex flex-col gap-4 p-2 rounded-md m-2">
      <div className="flex items-center justify-center gap-6">
        <p className="font-semibold text-[16px] text-white">{user?.name}</p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-1 gap-4">
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-[10px] text-white underline">Email</p>
          <p className="text-[12px] text-white">{user?.email}</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-[10px] text-white underline">Phone Number</p>
          <p className="text-[12px] text-white">{user?.phoneNumber}</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-[10px] text-white underline">Date of Birth</p>
          <p className="text-[12px] text-white">
            {user?.birthDate?.toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-[10px] text-white underline">Occupation</p>
          <p className="text-[12px] text-white">{user?.occupation}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2  gap-4">
        {user.events
          .filter((item) => item.status === "pending")
          .map((e, index) => (
            <RegisteredEvent key={index} title={e.event.title} id={e.id} />
          ))}
      </div>
    </div>
  );
};

export default RegisteredList;
