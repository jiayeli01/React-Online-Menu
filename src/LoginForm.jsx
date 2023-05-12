import { useState } from 'react';
//import './login.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isDog, setDog] = useState('');

  function isValidUsername(username) {
    return username.match(/^[a-zA-Z0-9]+$/);
  }

  const checkName = (event) => {
    event.preventDefault();
    setIsValid(true);
    setDog(false);
    if(username === 'dog'){
        setDog(true);
    }else if (!isValidUsername(username)) {
      setIsValid(false);
    }else{
        onLogin(username);
    }
  }

  return (
    <div className='login-form'>
      <h1>Please login first</h1>
        <form className='login-form' action="#/login" onSubmit={checkName}>
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className='login-input'
            />
            <button className='login-button' >Login</button>
            {!isValid && <p className='alert'>Invalid username !</p>}
            {isDog && <p className='alert'>Not a valid user !</p>}
        </form>
    </div>
  );
}

export default LoginForm;