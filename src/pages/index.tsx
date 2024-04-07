import type { NextPage } from "next";
import SignIn from "./signIn";
import Products from "./products";

const Home: NextPage = ({}) => {
  let currentUser;
  if (typeof window !== "undefined" && window.localStorage)
    currentUser = localStorage.getItem("currentUser");
  return <SignIn />;
};
export default Home;
