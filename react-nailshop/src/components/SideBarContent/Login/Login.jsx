import InputCommon from '@components/InputCommon/InputCommon';
import styles from './styles.module.scss';

function Login() {

    const { container, title, boxRememberMe, loginButton, lostbtn } = styles;

    return (
        <div className={container}>
            <div className={title}>
                Sign In
            </div>
            <InputCommon label='Email' type='text' isRequired />
            <InputCommon label='Password' type='password' isRequired />

            <div className={boxRememberMe}>
                <input type='checkbox' />
                <span>Remember me</span>
            </div>

            <button className={loginButton}>LOGIN</button>
            <div className={lostbtn}>Forgot your password </div>
        </div >
    );
}

export default Login;