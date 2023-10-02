import SignUp from '../../component/sign-up/sign-up-form.component';
import SignIn from '../../component/sign-in/sign-in-form.component';
import './authentication.styles.scss'

const Authentication=()=> {
  //google redirect ucun auth, getredirectresult ve useEffect lazim idi
 
  return (
    <div className="authentication-container">
      <SignIn/>
      <SignUp/>
    </div>
  );
}

export default Authentication;
