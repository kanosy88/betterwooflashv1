import { useState } from "react";
import { motion } from "framer-motion";
import assuranceCard from "./compenents/assuranceCardComp";
import fetchCoursesList from "./function/fetchCoursesList";
import createNewFlashCard from "./function/createNewFlashCard";
import LoginCompi from "./compenents/loginComp";
import "./App.css";

const api_key = "sk_JGyjegw69OOrT4kZlkiJnftM0TCfNxZf4Kkc_vutfJQ";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_token, setUserToken] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const [quiz, setQuiz] = useState("");
  const [inputSynthesis, setInputSynthsis] = useState("");
  const [CourseId, setCourseId] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const onCourseIdChange = (e) => {
    setCourseId(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onInputSynthesisChange = (e) => {
    setInputSynthsis(e.target.value);
  };

  const cutBigResponse = (text, token) => {
    let lines = text.split("\n");
    lines.map((line) => {
      let parts = line.trim().split(":");
      let recto = parts[0];
      let verso = parts[1];

      if (recto == "") {
        return;
      } else {
        createNewFlashCard(recto, verso, CourseId, token, token);
      }
    });
    console.log("Da course is finish");
  };

  const fetchQuestionBySynthesis = async (synthesis) => {
    console.log("GetAiReponse");
    try {
      const response = await fetch(
        "https://api.theforgeai.com/v1/apps/64b52b43ed6b64a96d129845/view/run",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": `${api_key}`,
          },
          body: JSON.stringify({
            user_inputs: {
              text_input_3: {
                value: `${synthesis}`,
              },
              text_input_13: {
                value: 10,
              },
            },
          }),
        }
      );

      const data = await response.json();
      setQuiz(data.user_outputs.text_output_21.value);
      console.log("Generate is finsh");
      cutBigResponse(data.user_outputs.text_output_21.value, user_token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-[#A382F9] text-center py-5 shadow-xl" id="header">
        <div>
          <h1 className="font-extrabold ml-5 text-4xl tracking-tight text-slate-50">
            BetterWooflash
          </h1>
          <p className="transition ease-in-out delay-150 font-bold capitalize text-slate-50">
            Tout ce qu'il manque sur Wooflash
          </p>
        </div>
      </div>
      <div className="grid place-content-center m-5 divide-y" id="Grid">
        <LoginCompi
          isLogin={isLogin}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          user_token={user_token}
          setUserToken={setUserToken}
          email={email}
          password={password}
          setCoursesList={setCoursesList}
          setIsLogin={setIsLogin}
        />
        <div id="ListeDeCours">
          {user_token.length > 1 && (
            <div>
              <h1 className="text-4xl text-center m-5 font-bold text-[#A382F9]">
                Liste de vos Cours
              </h1>
              <div className=" grid place-content-center pt-5 " id="Cours">
                <motion.button
                  className="bg-[#A382F9] rounded-md font-bold text-slate-50 shadow-2xl p-1.5  hover:bg-[#735daf]"
                  whileHover={{ scale: 1.1 }}
                  onHoverStart={(e) => {}}
                  onHoverEnd={(e) => {}}
                  onClick={() => fetchCoursesList(user_token, setCoursesList)}
                >
                  Refresh la liste des cours
                </motion.button>
                <div
                  className="grid grid-rows-4 grid-flow-col gap-4 bg-slate-200 p-5 my-5 max-w-4xl"
                  id="CourseList"
                >
                  {coursesList.map((course) => (
                    <div
                      className="p-2.5 bg-slate-300 m-1 shadow-sm"
                      key={course.id}
                    >
                      <p className="text-lg font-bold">{course.title}</p>
                      <p>
                        ID :{" "}
                        <a className="underline decoration-indigo-500">
                          {course.id}
                        </a>
                      </p>
                      <p className="text-lg">
                        Code:{" "}
                        <a className="underline decoration-indigo-500">
                          {course.accessCode}
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div id="notionToWooflash">
          <h1 className="text-4xl text-center m-5 font-bold text-[#A382F9]">
            Synthesis to Wooflash FlashCard
          </h1>
          <div className="flex flex-wrap">
            <textarea
              className=" border-[#A382F9] bg-slate-50 p-1.5 rounded-md min-w-full h-[400px]"
              placeholder="Votre synthese notion"
              onChange={onInputSynthesisChange}
            ></textarea>

            <input
              className=" border-[#A382F9] bg-slate-50 p-2.5 rounded-md min-w-full mt-5"
              placeholder="Course ID"
              onChange={onCourseIdChange}
            ></input>
            <motion.button
              className="bg-[#A382F9] rounded-md font-bold capitalize text-slate-50 shadow-2xl p-2.5 mx-auto m-5 hover:bg-[#735daf]"
              whileHover={{ scale: 1.1 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
              onClick={() => fetchQuestionBySynthesis(inputSynthesis)}
            >
              Envoyer
            </motion.button>
          </div>
        </div>
      </div>
      {assuranceCard()}
    </div>
  );
}

export default App;
