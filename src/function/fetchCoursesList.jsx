export default async function fetchCoursesList(token, setCoursesList) {
  try {
    const response = await fetch("https://api.wooflash.com/graphql", {
      method: "POST",
      headers: {
        authority: "api.wooflash.com",
        accept: "*/*",
        "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        authorization: `Bearer ${token}`,
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
        variables: {},
        query:
          "{\n  coursesMe {\n    ...CourseData\n    owner {\n      ...ParticipantData\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment CourseData on Course {\n  id\n  accessCode\n  title\n  introduction\n  isLinear\n  masteryThreshold\n  themeBackground\n  themeText\n  isExam\n  isLinearExam\n  examStartTime\n  examStopTime\n  examDurationMinutes\n  examInRandomOrder\n  nQuestionsByExam\n  examInstructions\n  isExamReviewEnabled\n  isStudentCollaborationEnabled\n  isPublic\n  category\n  language\n  destination\n  classes\n  institution\n  nLikes\n  isLiked\n  level\n  isPinned\n  folderId\n  moodle\n  lti\n  msTeams\n  gar\n  tags {\n    ...TagData\n    __typename\n  }\n  createdAt\n  lastConnection\n  deadline\n  canEditDeadline\n  __typename\n}\n\nfragment TagData on Tag {\n  id\n  title\n  __typename\n}\n\nfragment ParticipantData on Participant {\n  id\n  accountId\n  courseId\n  groupId\n  firstName\n  lastName\n  picture\n  username\n  email\n  level\n  isActive\n  metadata\n  __typename\n}\n",
      }),
    });

    const data = await response.json();
    const list = data.data.coursesMe;

    setCoursesList(list);

    console.log(list);

    return data.data;
  } catch (error) {
    console.log(error);
  }
}
