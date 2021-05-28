import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import Call from "./Call";
import StartButton from "./StartButton";
import api from "./api/meeting";
import Tray from "./Tray";
import CallObjectContext from "../context/CallObjectContext";
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from "../utils/urlUtils";
import DailyIframe from "@daily-co/daily-js";
import { logDailyEvent } from "../utils/logUtils";
import { UserCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";

const STATE_IDLE = "STATE_IDLE";
const STATE_CREATING = "STATE_CREATING";
const STATE_JOINING = "STATE_JOINING";
const STATE_JOINED = "STATE_JOINED";
const STATE_LEAVING = "STATE_LEAVING";
const STATE_ERROR = "STATE_ERROR";

export default function HostMeeting() {
  const [session, loading] = useSession();
  const router = useRouter();
  const [appState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const [meetingName, setMeetingName] = useState("");
  const [expandProfile, setExpandProfile] = useState(false);

  useEffect(() => {
    // console.log("showCall", showCall);
    // console.log("roomUrl", roomUrl);
    // console.log("session", session);
    // console.log("loading", loading);
    // if (!showCall && roomUrl === null && (session === null) & !loading) {
    //   console.log("condition satisfied");
    //   router.push("/");
    // }
    // if (!showCall && roomUrl === null && session && !loading)
    //   router.push("/");
  });

  function toggleProfile() {
    setExpandProfile(!expandProfile);
  }

  /**
   * Creates a new call room.
   */
  const createCall = useCallback(() => {
    setAppState(STATE_CREATING);
    return api
      .createRoom(meetingName)
      .then((room) => {
        if (room.url !== undefined) {
          // console.log("room.url", room.url);
          return room.url;
        }
      })
      .catch((error) => {
        console.log("Error creating room", error);
        setRoomUrl(null);
        setAppState(STATE_IDLE);
      });
  }, [meetingName]);

  /**
   * Starts joining an existing call.
   *
   * NOTE: In this demo we show how to completely clean up a call with destroy(),
   * which requires creating a new call object before you can join() again.
   * This isn't strictly necessary, but is good practice when you know you'll
   * be done with the call object for a while and you're no longer listening to its
   * events.
   */
  const startJoiningCall = useCallback((url) => {
    const newCallObject = DailyIframe.createCallObject();
    setRoomUrl(url);
    setCallObject(newCallObject);
    setAppState(STATE_JOINING);
    newCallObject.join({ url });
  }, []);

  /**
   * Starts leaving the current call.
   */
  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    // If we're in the error state, we've already "left", so just clean up
    if (appState === STATE_ERROR) {
      callObject.destroy().then(() => {
        setRoomUrl(null);
        setCallObject(null);
        setAppState(STATE_IDLE);
      });
    } else {
      setAppState(STATE_LEAVING);
      callObject.leave();
    }
  }, [callObject, appState]);

  /**
   * If a room's already specified in the page's URL when the component mounts,
   * join the room.
   */
  useEffect(() => {
    const url = roomUrlFromPageUrl();
    url && startJoiningCall(url);
  }, [startJoiningCall]);

  /**
   * Update the page's URL to reflect the active call when roomUrl changes.
   *
   * This demo uses replaceState rather than pushState in order to avoid a bit
   * of state-management complexity. See the comments around enableCallButtons
   * and enableStartButton for more information.
   */
  useEffect(() => {
    const pageUrl = pageUrlFromRoomUrl(roomUrl);
    if (pageUrl === window.location.href) return;
    window.history.replaceState(null, null, pageUrl);
  }, [roomUrl]);

  /**
   * Uncomment to attach call object to window for debugging purposes.
   */
  // useEffect(() => {
  //   window.callObject = callObject;
  // }, [callObject]);

  /**
   * Update app state based on reported meeting state changes.
   *
   * NOTE: Here we're showing how to completely clean up a call with destroy().
   * This isn't strictly necessary between join()s, but is good practice when
   * you know you'll be done with the call object for a while and you're no
   * longer listening to its events.
   */
  useEffect(() => {
    if (!callObject) return;

    const events = ["joined-meeting", "left-meeting", "error"];

    function handleNewMeetingState(event) {
      event && logDailyEvent(event);
      switch (callObject.meetingState()) {
        case "joined-meeting":
          setAppState(STATE_JOINED);
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case "error":
          setAppState(STATE_ERROR);
          break;
        default:
          break;
      }
    }

    // Use initial state
    handleNewMeetingState();

    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  /**
   * Listen for app messages from other call participants.
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event) {
      if (event) {
        logDailyEvent(event);
        console.log(`received app message from ${event.fromId}: `, event.data);
      }
    }

    callObject.on("app-message", handleAppMessage);

    return function cleanup() {
      callObject.off("app-message", handleAppMessage);
    };
  }, [callObject]);

  /**
   * Show the call UI if we're either joining, already joined, or are showing
   * an error.
   */
  const showCall = [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(
    appState
  );

  /**
   * Only enable the call buttons (camera toggle, leave call, etc.) if we're joined
   * or if we've errored out.
   *
   * !!!
   * IMPORTANT: calling callObject.destroy() *before* we get the "joined-meeting"
   * can result in unexpected behavior. Disabling the leave call button
   * until then avoids this scenario.
   * !!!
   */
  const enableCallButtons = [STATE_JOINED, STATE_ERROR].includes(appState);

  /**
   * Only enable the start button if we're in an idle state (i.e. not creating,
   * joining, etc.).
   *
   * !!!
   * IMPORTANT: only one call object is meant to be used at a time. Creating a
   * new call object with DailyIframe.createCallObject() *before* your previous
   * callObject.destroy() completely finishes can result in unexpected behavior.
   * Disabling the start button until then avoids that scenario.
   * !!!
   */
  const enableStartButton = appState === STATE_IDLE;

  return (
    <div className="app">
      {showCall && ( // NOTE: for an app this size, it's not obvious that using a Context
        // is the best choice. But for larger apps with deeply-nested components
        // that want to access call object state and bind event listeners to the
        // call object, this can be a helpful pattern.
        <CallObjectContext.Provider value={callObject}>
          <Call roomUrl={roomUrl} />
          <Tray
            disabled={!enableCallButtons}
            onClickLeaveCall={startLeavingCall}
          />
        </CallObjectContext.Provider>
      )}
      {session && (
        <div className="p-5 h-screen relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-6">
            <div className="grid justify-items-center gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Meeting Name"
                  onChange={(e) => setMeetingName(e.target.value)}
                />
              </div>
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
              <div>
                <StartButton
                  disabled={!enableStartButton}
                  onClick={() => {
                    createCall().then((url) => startJoiningCall(url));
                  }}
                />
                {loading ? <p>loading...</p> : ""}
              </div>
            </div>
          </div>
          <div className="grid grid-rows-3">
            <div className="flex justify-end">
              <div>
                <button className="btn" onClick={toggleProfile}>
                  <UserCircleIcon className="w-10" />
                </button>
              </div>
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
          </div>
        </div>
      )}
    </div>
  );
}
