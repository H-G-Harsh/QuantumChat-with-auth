import './dashboard.css'
import { useState, useEffect } from "react";
import { useUser } from "../../lib/UserContext";
import axios from "axios";

function DashboardOld() {
  const { user, loading } = useUser();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!loading && user) {
      axios.get(`/api/userchats?userId=${user.id}`)
        .then(res => setChats(res.data))
        .catch(err => console.error(err));
    }
  }, [user, loading]);

  // Add chat creation logic here if needed, using user.id

  return (
    <div className='dashboard'>
      <div className="texts">
        <div className="logo">
          <img src="/final.jpg" alt="" />
          <h1>QuantumChat</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/dash1.webp" alt="" />
            <span>Open a New Chat</span>
          </div>
          <div className="option">
            <img src="/dash2.jpg" alt="" />
            <span>Image Analysis</span>
          </div>
          <div className="option">
            <img src="/dash3.jpg" alt="" />
            <span>Coding Assistant</span>
          </div>
          <div className="option">
            <img src="/dash4.jpg" alt="" />
            <span>Help me write</span>
          </div>
        </div>
      </div>
      <div className="formcontainer">
        <form /* onSubmit={handleSubmit} */>
          <input type="text" name="text" placeholder="Ask me anything....." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useUser();

  const mutation = useMutation({
    mutationFn: async (text) => {
      const { data: { session } } = await window.supabase.auth.getSession();
      const token = session?.access_token;
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      console.log("Returned ID:", id); // should log: { _id: "..." }
      navigate(`/dashboard/chat/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    mutation.mutate(text);
  };

  useEffect(() => {
    if (!loading && user) {
      (async () => {
        const { data: { session } } = await window.supabase.auth.getSession();
        const token = session?.access_token;
        axios.get(`/api/userchats`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
          .then(res => setChats(res.data))
          .catch(err => console.error(err));
      })();
    }
  }, [user, loading]);

  return (
    <div className='dashboard'>
      <div className="texts">
        <div className="logo">
          <img src="/final.jpg" alt="" />
          <h1>QuantumChat</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/dash1.webp" alt="" />
            <span>Open a New Chat</span>
          </div>
          <div className="option">
            <img src="/dash2.jpg" alt="" />
            <span>Image Analysis</span>
          </div>
          <div className="option">
            <img src="/dash3.jpg" alt="" />
            <span>Coding Assistant</span>
          </div>
          <div className="option">
            <img src="/dash4.jpg" alt="" />
            <span>Help me write</span>
          </div>
        </div>
      </div>
      <div className="formcontainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything....." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;