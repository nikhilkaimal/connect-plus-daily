import { useSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Index() {
  let [callbackUrl, setCallbackUrl] = useState("");
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (process.env.phase === "local")
      setCallbackUrl("http://localhost:3000/HostMeeting");
    else setCallbackUrl("https://connect-plus-daily.vercel.app/HostMeeting");
  }, [process.env.phase]);

  function hostMeeting() {
    if (!(session || loading)) {
      signIn(null, {
        callbackUrl,
      });
    } else router.push("/HostMeeting");
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>ConnectPlus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>ConnectPlus</h1>

          <div className="w-full p-2 mt-10">
            <Link href="/JoinMeeting">
              <button className="btn btn-simple w-full mb-5">
                Join a Meeting
              </button>
            </Link>

            <button
              className="btn btn-simple w-full mb-5"
              onClick={() => hostMeeting()}
            >
              Host a Meeting
            </button>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    </>
  );
}
