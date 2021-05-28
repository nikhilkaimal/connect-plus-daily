import { useSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Index() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    // if (session) router.push("/Home");
    // console.log('reached here')
  });

  function hostMeeting() {
    if (!session)
      signIn(null, {
        callbackUrl: "http://localhost:3000/HostMeeting",
      });
    else router.push("/HostMeeting");
  }

  return (
    <>
      {/* {!(session || loading) && ( */}
      <div className={styles.container}>
        <Head>
          <title>Connect+</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>CONNECT+</h1>

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

            {/* <div className="flex">
                <div className="w-1/2 mr-2">
                  <button
                    className="btn btn-simple w-full"
                    onClick={() =>
                      signIn(null, {
                        callbackUrl: "http://localhost:3000/Home",
                      })
                    }
                  >
                    Sign In
                  </button>
                </div>
                <div className="w-1/2">
                  <Link href="/Signup">
                    <button className="btn btn-simple w-full">Sign Up</button>
                  </Link>
                </div>
              </div> */}
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
      {/* )} */}
    </>
  );
}
