/**
 * Create a short-lived room for demo purposes.
 *
 * It uses the redirect proxy as specified in netlify.toml`
 * This will work locally if you following the Netlify specific instructions
 * in README.md
 *
 * See https://docs.daily.co/reference#create-room for more information on how
 * to use the Daily REST API to create rooms and what options are available.
 */
async function createRoom(meetingName) {
  const url = "https://api.daily.co/v1/rooms";

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 0a626bf0ceb0d65c0e0712147590f9bdef2c94eb7cd2d9cac503d491f2e5c181",
    },
    body: JSON.stringify({
      properties: { enable_network_ui: false },
      name: meetingName,
    }),
  };

  let response = await fetch(url, options).catch((err) =>
    console.log("error:" + err)
  );

  let meeting = await response.json();

  return { url: meeting.url };
}

export default { createRoom };
