import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  const [expandProfile, setExpandProfile] = useState(false);

  // useEffect(() => {
  //   if (!(session || loading)) {
  //     router.push("/");
  //   }
  // });
  useState(() => {console.log("reached home")});


  function toggleProfile() {
    setExpandProfile(!expandProfile);
  }

  return (
    <>
      {session && (
        <div className="p-5">
          <div className="flex justify-end">
            <button className="btn" onClick={toggleProfile}>
              <UserCircleIcon className="w-10" />
            </button>
          </div>
          <div className="flex justify-end">
            <div
              className="grid grid-cols-1 text-center w-48"
              style={{
                display: expandProfile ? "block" : "none",
              }}
            >
              <div className="border border-blue-500 rounded-t-lg">
                <Link href="/Profile">
                  <button className="btn">View Profile</button>
                </Link>
              </div>
              <div className="border border-blue-500 rounded-b-lg">
                <button
                  className="btn"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-evenly m-10 p-10">
            <div className="w-2/5">
              <Link href="JoinMeeting">
                <button className="btn-3d w-full h-40 text-3xl">
                  Join a Meeting
                </button>
              </Link>
            </div>
            <div className="w-1/5 text-center">
              <p className="text-3xl my-14">or</p>
            </div>
            <div className="w-2/5">
              <Link href="/HostMeeting">
                <button className="btn-3d w-full h-40 text-3xl">
                  Host a Meeting
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
