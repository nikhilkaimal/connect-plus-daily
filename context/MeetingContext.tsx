import { createContext, useContext, ReactNode, useState } from "react";

type meetingContextType = {
  meetingName: string;
  host: string;
  passcode: string;
  updateMeetingName: (string) => void;
  updateHost: (string) => void;
  updatePasscode: (string) => void;
};

const meetingContextDefaultValues: meetingContextType = {
  meetingName: "",
  host: "",
  passcode: "",
  updateMeetingName: () => {},
  updateHost: () => {},
  updatePasscode: () => {},
};

const MeetingContext = createContext<meetingContextType>(
  meetingContextDefaultValues
);

export function useMeeting() {
  return useContext(MeetingContext);
}

type Props = { children: ReactNode };

export function MeetingProvider({ children }: Props) {
  const [meetingName, setMeetingName] = useState("");
  const [host, setHost] = useState("");
  const [passcode, setPasscode] = useState("");

  const updateMeetingName = (meetingName) => {
    setMeetingName(meetingName);
  };

  const updateHost = (host) => {
    setHost(host);
  };

  const updatePasscode = (passcode) => {
    setPasscode(passcode);
  };

  const value = {
    meetingName,
    host,
    passcode,
    updateMeetingName,
    updateHost,
    updatePasscode,
  };

  return (
    <>
      <MeetingContext.Provider value={value}>
        {children}
      </MeetingContext.Provider>
    </>
  );
}
