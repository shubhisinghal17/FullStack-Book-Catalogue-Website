import { useState } from 'react';
import './LoginForm.css';



function LoginForm({ onLogin, setError, isRegistered }) {
    const [typedName, setTypedName] = useState("");

    const handleUsername = (e) => {
        setTypedName(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault();
        if (typedName) {
            const username = typedName;
            onLogin(username);
            setTypedName("");
        }
    };


    return (
        <>
            {isRegistered && <p className='congratulations-message'>Congratulations! You have been Registered</p>}
            <div className="login" onSubmit={onSubmit}>
                <form className="login-form" action="#login">
                    <label htmlFor="username-input">
                        Login Username
                    </label>
                    <input id="username-input" className="login-username" value={typedName} onChange={handleUsername} />
                    <button className="login-button" type="submit">Login</button>
                </form>
            </div>
        </>

    );

};
export default LoginForm;