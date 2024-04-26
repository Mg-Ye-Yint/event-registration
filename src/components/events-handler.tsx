"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const EventsHandler = ({
  event,
}: {
  event: {
    id: string;
    time: string;
    photoURL: string;
    title: string;
    category: string;
    description: string;
    location: string;
    date: Date;
  };
}) => {
  const [ready, setReady] = useState(false);

  const router = useRouter();

  const eventRegistration = () => {
    setReady(!ready);
  };

  const isImageURL = (url: string) => {
    const imageExtensions = /.(jpg|jpeg|png|gif)$/i;
    return imageExtensions.test(url);
  };

  const deleteEvent = async () => {
    try {
      await axios.delete(`/api/event/${event.id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-start justify-between h-full w-[175px] sm:w-[100px]  p-3 bg-slate-600 gap-3 sm:gap-1 rounded-lg overflow-hidden">
        <div className="space-y-3 overflow-x-auto max-w-full">
          {/* Conditional rendering for the image */}
          {isImageURL(event.photoURL) ? (
            <Image
              src={event.photoURL}
              alt="photo"
              width={200}
              height={200}
              className="w-full h-auto object-fit"
            />
          ) : (
            <div className="w-full h-auto bg-black">
              <p className="text-white">No Image</p>
            </div>
          )}

          {/* Event title and description */}
          <div className="flex flex-col items-start justify-start w-full min-w-max">
            <p className="font-semibold text-white text-[18px] whitespace-nowrap">
              {event.title}
            </p>
            <p className="text-white text-[14px] break-words text-justify">
              {event.description}
            </p>
          </div>

          {/* Event date and location */}
          <div className="flex items-start justify-between w-full min-w-max">
            <p className="font-semibold text-white text-[12px] whitespace-nowrap">
              {event.date.toLocaleDateString()},
            </p>
            <p className="font-semibold text-white text-[12px] max-w-[150px] ml-1 whitespace-nowrap">
              {event.time},
            </p>
            <p className="font-semibold text-white text-[12px] max-w-[150px] ml-1 whitespace-nowrap">
              {event.location}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-start gap-4">
          {ready ? (
            <div className="flex items-center justify-center gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white p-2 sm:p-1 font-semibold rounded-md duration-300
                text-[16px]  sm:text-[10px]"
                onClick={() => {
                  setReady(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 p-2 text-white sm:p-1 font-semibold rounded-md duration-300 text-[16px] 
                sm:text-[10px]"
                onClick={deleteEvent}
              >
                Sure
              </button>
            </div>
          ) : (
            <button
              className="bg-red-500  hover:bg-red-700 p-2 text-white sm:p-1 font-semibold rounded-md duration-300 text-[16px] 
              sm:text-[10px]"
              onClick={() => {
                setReady(true);
              }}
            >
              Cancel Event
            </button>
          )}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default EventsHandler;
