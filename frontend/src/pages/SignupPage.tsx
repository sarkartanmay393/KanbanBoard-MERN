import React from "react";
import { useNavigate } from "react-router-dom";
import { useStoreActions } from "../state/typedHooks";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { setUser } = useStoreActions((action) => (action));


  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    const credentials = JSON.stringify({
      email: email,
      password: password,
    });

    setUser(null);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      });

      const resp = await response.json();

      if (response.status === 401) {
        setError(resp);
      } else {
        setEmail("");
        setPassword("");
        navigate('/login')
      }

      setIsLoading(false);
    }
    catch (error) {
      setError(`${error}`)
      console.log(`Error appeared: ${error}`)
    };

  }


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    switch (e.target.name) {
      case "email": {
        setEmail(() => e.target.value);
        break;
      }
      case "password": {
        setPassword(() => e.target.value);
        break;
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[100vh]">
      <div className="grid p-4 w-full md:w-[50%] lg:w-[30%] rounded-[2px] border-[1px] border-solid border-black gap-2">
        <h2 className="text-[3rem] font-[500] ">Signup</h2>
        <p className="text-[1rem] font-[400] ">Alreay got one! <a className="inline font-[500]" href="/login">Login here</a></p>
        <div className="grid gap-2">
          <input className="h-[36px] px-2 rounded-[2px] border-[1px] border-solid border-black" name="email" type="text" value={email} onChange={handleOnChange} placeholder="Type your Email" />
          <input className="h-[36px] px-2 rounded-[2px] border-[1px] border-solid border-black" name="password" type="password" value={password} onChange={handleOnChange} placeholder="A Strong Password" />
          <button className="h-[28px] px-2 rounded-[2px] border-[1px] border-solid border-black cursor-pointer font-[500] bg-pink-100 hover:bg-pink-200" type="button" onClick={handleSubmit}>{isLoading ? '⏳' : "Submit"}</button>
          <div style={{ display: error ? 'flex' : 'none' }} className="min-h-[28px] items-center px-2 rounded-[2px] cursor-pointer text-md bg-red-300 hover:bg-pink-200">{error && error}</div>
        </div>
      </div>
    </div>
  );
}