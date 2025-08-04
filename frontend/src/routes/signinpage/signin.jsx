import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import "./signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Sign In</button>
        {error && <div className="error">{error}</div>}
        <p>Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Signin;