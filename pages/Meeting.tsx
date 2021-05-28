import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMeeting } from "../context/MeetingContext";
import {
  PresentationChartBarIcon,
  UserAddIcon,
  UserCircleIcon,
  MicrophoneIcon,
  UserRemoveIcon,
  UsersIcon,
  XIcon,
  VideoCameraIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  PhoneMissedCallIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

export default function meeting() {
  const [session, loading] = useSession();
  const router = useRouter();
  const { passcode, meetingName, host } = useMeeting();
  const [participants, setParticipants] = useState(false);
  const [chat, setChat] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [microphone, setMicrophone] = useState(false);
  const [video, setVideo] = useState(false);

  useEffect(() => {
    if (!(session || loading)) router.push("/");
  });

  function toggleParticipants() {
    setChat(false);
    setParticipants(!participants);
  }

  function toggleMicrophone() {
    setMicrophone(!microphone);
  }

  function toggleVideo() {
    setVideo(!video);
  }

  function toggleChat() {
    setParticipants(false);
    setChat(!chat);
  }

  function toggleMoreOptions() {
    setMoreOptions(!moreOptions);
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="flex p-4">
          <div className="w-2/3">
            <table className="table-auto w-1/2 text-center border border-blue-500">
              <tbody>
                <tr className="h-20">
                  <td className="w-1/2">Meeting Name</td>
                  <td>:</td>
                  <td className="w-1/2">{meetingName}</td>
                </tr>
                <tr className="h-20">
                  <td className="w-1/2">Host</td>
                  <td>:</td>
                  <td className="w-1/2">{host}</td>
                </tr>
                <tr className="h-20">
                  <td className="w-1/2">Invite Link</td>
                  <td>:</td>
                  <td className="w-1/2">
                    {/* <p>http://abcdefge?pwd=...</p>
                    <button className="underline">Copy Link</button> */}
                  </td>
                </tr>
                <tr className="h-20">
                  <td className="w-1/2">Meeting Id</td>
                  <td>:</td>
                  <td className="w-1/2"></td>
                </tr>
                <tr className="h-20">
                  <td className="w-1/2">Passcode</td>
                  <td>:</td>
                  <td className="w-1/2">{passcode}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-1/3">
            <p>Share Screen</p>
            <button>
              <div className="border border-blue-500 p-4">
                <PresentationChartBarIcon className="w-40 h-10 object-contain" />
              </div>
            </button>
            <br />
            <p>Invite Others</p>
            <button>
              <div className="border border-blue-500 p-4">
                <UserAddIcon className="w-40 h-10 object-contain" />
              </div>
            </button>
          </div>
          {/* Participants Box */}
          <div
            className="min-w-min border-l p-2"
            style={{
              display: participants ? "block" : "none",
            }}
          >
            <div className="flex">
              <div className="w-1/2">
                <p>Participants</p>
              </div>
              <div className="w-1/2 text-right">
                <p>Mute All</p>
              </div>
            </div>
            <div className="flex mt-5">
              <input type="search" placeholder="Search" />
            </div>
            <div className="flex mt-5">
              <div className="w-1/5">
                <div className="flex justify-center ...">
                  <UserCircleIcon className="w-6" />
                </div>
              </div>
              <div className="w-3/5">
                <p>Sulekha Varma</p>
              </div>
              <div className="w-1/5">
                <div className="flex justify-center ...">
                  <MicrophoneIcon className="w-6" />
                  <UserRemoveIcon className="w-6  " />
                </div>
              </div>
            </div>
            <div className="flex mt-5">
              <div className="w-1/5">
                <div className="flex justify-center ...">
                  <UserCircleIcon className="w-6" />
                </div>
              </div>
              <div className="w-3/5">
                <p>Ashikha Aroop</p>
              </div>
              <div className="w-1/5">
                <div className="flex justify-center ...">
                  <MicrophoneIcon className="w-6" />
                  <UserRemoveIcon className="w-6  " />
                </div>
              </div>
            </div>
          </div>
          {/* Chat Box */}
          <div
            className="border p-2 relative w-96"
            style={{
              display: chat ? "block" : "none",
            }}
          >
            <div className="flex">
              <div className="w-full">
                <p>Chat</p>
              </div>
            </div>
            <div className="flex mt-5">
              <div className="w-1/2">
                <div className="flex justify-center ...">
                  <button>Everyone</button>
                </div>
              </div>
              <div className="w-1/2 ml-5">
                <div className="flex justify-center ...">
                  <button>Personal</button>
                </div>
              </div>
            </div>
            <div className="flex absolute bottom-0 left-0 w-full">
              <input type="text" placeholder="Type here" className="w-full" />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-28 h-16 flex justify-center">
          <table>
            <tbody>
              <tr>
                <td className="w-72"></td>
                <td className="w-72"></td>
                <td className="w-48">
                  <div
                    className="grid grid-cols-1 text-center"
                    style={{
                      display: moreOptions ? "block" : "none",
                    }}
                  >
                    <div className="border border-blue-500 rounded-t-lg">
                      Video Settings
                    </div>
                    <div className="border border-blue-500">Audio Settings</div>
                    <div className="border border-blue-500">Hold</div>
                    <div className="border border-blue-500 rounded-b-lg">
                      Record
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 flex justify-center">
          <table>
            <tbody>
              <tr>
                <td className="w-24 border border-blue-500 text-center">
                  1:35
                </td>
                <td className="w-24 border border-blue-500">
                  <div className="flex justify-center ...">
                    <button className="btn" onClick={toggleParticipants}>
                      <UsersIcon className="w-4" />
                    </button>
                  </div>
                </td>
                <td className="w-24 border border-blue-500">
                  <div className="flex justify-center ...">
                    <button className="btn" onClick={toggleMicrophone}>
                      <div>
                        <MicrophoneIcon className="w-4" />
                      </div>
                      <div
                        style={{
                          display: microphone ? "block" : "none",
                        }}
                      >
                        <XIcon className="w-4" />
                      </div>
                    </button>
                  </div>
                </td>
                <td className="w-24 border border-blue-500">
                  <div className="flex justify-center ...">
                    <button className="btn" onClick={toggleVideo}>
                      <div>
                        <VideoCameraIcon className="w-4" />
                      </div>
                      <div
                        style={{
                          display: video ? "block" : "none",
                        }}
                      >
                        <XIcon className="w-4" />
                      </div>
                    </button>
                  </div>
                </td>
                <td className="w-24 border border-blue-500">
                  <div className="flex justify-center ...">
                    <div>
                      <PresentationChartBarIcon className="w-4" />
                    </div>
                  </div>
                </td>
                <td className="w-24 border border-blue-500">
                  <div className="flex justify-center ...">
                    <button className="btn" onClick={toggleChat}>
                      <ChatAltIcon className="w-4" />
                    </button>
                  </div>
                </td>
                <td className="w-24 border border-blue-500">
                  <div className="flex justify-center ...">
                    <button className="btn" onClick={toggleMoreOptions}>
                      <DotsHorizontalIcon className="w-4" />
                    </button>
                  </div>
                </td>
                <td className="w-24 border border-blue-500">
                  <div className="flex justify-center ...">
                    <div>
                      <Link href="/Home">
                        <button className="btn">
                          <PhoneMissedCallIcon className="w-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
