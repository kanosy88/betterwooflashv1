import fetchCoursesList from "./fetchCoursesList";

export default async function fetchToken(
  user_token,
  setUserToken,
  email,
  password,
  setCoursesList,
  setIsLogin
) {
  if (user_token.length > 1) return;

  try {
    const response = await fetch("https://api.wooflash.com/graphql", {
      method: "POST",
      headers: {
        authority: "api.wooflash.com",
        accept: "*/*",
        "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/json",
        origin: "https://app.wooflash.com",
        referer: "https://app.wooflash.com/",
        "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "sec-gpc": "1",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "x-language": "fr",
      },
      body: JSON.stringify({
        operationName: "AuthLogin",
        variables: {
          password: `${password}`,
          username: `${email}`,
        },
        query:
          "mutation AuthLogin($username: String!, $password: String!) {\n  authLogin(username: $username, password: $password)\n}\n",
      }),
    });

    const data = await response.json();
    const token = data.data.authLogin;
    setUserToken(token);
    fetchCoursesList(token, setCoursesList);
    setIsLogin(true);
    console.log("Account Successfully fetch");
  } catch (error) {
    console.log(error);
  }
}
