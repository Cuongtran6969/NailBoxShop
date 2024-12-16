import { useState } from "react";
import InputCommon from '@components/InputCommon/InputCommon';
import styles from './styles.module.scss';

function Login() {

    const { container, title, boxRememberMe, loginButton, lostbtn } = styles;
    const [isRegister, setIsRegister] = useState(false);

    const handleToggle = () => {
        setIsRegister(!isRegister);
        formik.resetForm();
    };

    return (
        <div className={container}>
            <div className={title}>
                {isRegister ? "SIGN UP" : "SIGN IN"}
            </div>
            <InputCommon label='Email' type='text' isRequired />
            <InputCommon label='Password' type='password' isRequired />
            {isRegister && (<InputCommon label='Confirm Password' type='password' isRequired />)}
            {!isRegister && <div className={boxRememberMe}>
                <input type='checkbox' />
                <span>Remember me</span>
            </div>
            }
            <button className={loginButton}>{isRegister ? "REGISTER" : "LOG IN"}</button>

            <button className={loginButton} onClick={handleToggle}>
                {isRegister ? "Already have an account?" : "Don't have an account?"}
            </button>


            {!isRegister && (<div className={lostbtn}>Forgot your password </div>)}
        </div >
    );
}

export default Login;