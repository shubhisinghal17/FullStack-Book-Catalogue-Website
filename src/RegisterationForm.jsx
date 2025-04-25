import { useState } from 'react';
import './RegisterationForm.css';

function RegisterationForm({ onRegister, setIsregistered, setError }) {
    const [typedName, setTypedName] = useState("");

    const handleUsername = (e) => {
        setTypedName(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault();
        if (typedName === "dog" || typedName === "admin" || !typedName.match(/^[A-Za-z0-9_]+$/)) {
            const username = typedName;
            onRegister(username);
            setTypedName("");
            setIsregistered(false);
        }
        else {
            const username = typedName;
            onRegister(username);
            setTypedName("");
            setIsregistered(true);
        }
    };

    return (
        <>
            <div className="registereation" onSubmit={onSubmit}>
                <form className="registereation-form" action="#register">
                    <label htmlFor="username-input">
                        Register User
                    </label>
                    <input id="username-input" className="registereation-username" value={typedName} onChange={handleUsername} />
                    <button className="register-button" type="submit">Register</button>
                </form>
            </div>
        </>
    );
};
export default RegisterationForm;