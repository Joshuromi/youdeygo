import SignIn from "../../components/sign-in/signin.component";
import SignUp from "../../components/sign-up/signup.component";
import "./signupAndSignin.css";

const SignupAndSignin = () => (
  <div className="signup-and-signin">
    <SignIn />
    <SignUp />
  </div>
);

export default SignupAndSignin;
