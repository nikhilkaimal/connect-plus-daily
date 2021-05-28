import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function JoinMeeting() {
  const [meetingUrl, setMeetingUrl] = useState("");
  const router = useRouter();

  function joinMeeting() {
    router.push(meetingUrl);
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="grid grid-cols-1 space-y-6 justify-items-center">
          <input
            type="text"
            placeholder="Enter Meeting Id or Personal Link"
            className="w-80"
            onChange={(e) => setMeetingUrl(e.target.value)}
          />
          <input type="text" placeholder="Enter your Name" className="w-80" />
          <div className="flex">
            <div>
              <input
                type="checkbox"
                className="rounded text-blue-500"
                id="audio"
              />
            </div>
            <div className="ml-2">
              <label htmlFor="audio">Audio</label>
            </div>
          </div>
          <div className="flex">
            <div>
              <input
                type="checkbox"
                className="rounded text-blue-500"
                id="video"
              />
            </div>
            <div className="ml-2">
              <label htmlFor="video">Video</label>
            </div>
          </div>

          <button className="btn-simple" onClick={() => joinMeeting()}>
            Join
          </button>
        </div>
      </div>
    </>
  );
}
