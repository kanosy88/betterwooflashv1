import { motion } from "framer-motion";
import fetchToken from "../function/fetchToken";

export default function LoginCompi({
  isLogin,
  onEmailChange,
  onPasswordChange,
  user_token,
  setUserToken,
  email,
  password,
  setCoursesList,
  setIsLogin,
}) {
  return (
    <div className="my-5 mx-auto" id="login">
      {!isLogin && (
        <div>
          <h1 className="text-4xl text-center m-5 font-bold text-[#A382F9]">
            Votre compte wooflash
          </h1>
          <div className="flex gap-4">
            <input
              className=" border-[#A382F9] bg-slate-50 p-1.5 rounded-md"
              placeholder="Email"
              onChange={onEmailChange}
              type="email"
              disabled={isLogin}
            ></input>
            <input
              className=" border-[#A382F9] bg-slate-50 p-1.5 rounded-md"
              placeholder="Mot de passe"
              onChange={onPasswordChange}
              type="password"
              disabled={isLogin}
            ></input>
            <motion.button
              className="bg-[#A382F9] rounded-md font-bold capitalize text-slate-50 shadow-2xl p-1.5 hover:bg-[#735daf]"
              whileHover={{ scale: 1.1 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
              onClick={() =>
                fetchToken(
                  user_token,
                  setUserToken,
                  email,
                  password,
                  setCoursesList,
                  setIsLogin
                )
              }
            >
              Se Connecter
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
