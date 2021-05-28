import { Provider } from "next-auth/client";
import { MeetingProvider } from "../context/MeetingContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <MeetingProvider>
        <Component {...pageProps} />
      </MeetingProvider>
    </Provider>
  );
}

export default MyApp;
