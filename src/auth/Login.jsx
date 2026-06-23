import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    setTimeout(() => {
      login(email, password);
      setLoading(false);
      
      if (email.includes('owner')) navigate('/owner');
      else if (email.includes('chef')) navigate('/chef');
      else navigate('/customer');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-card rounded-2xl border border-border p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-dark mb-6 font-[family-name:var(--font-poppins)]">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Email</label>
            <input name="email" type="email" defaultValue="owner@cafe.com" required className="w-full px-4 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/20" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Password</label>
            <input name="password" type="password" defaultValue="password123" required className="w-full px-4 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/20" placeholder="Enter password" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors">
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help logging in?</p>
          <p className="mt-1 font-medium text-dark">
            <span className="text-primary font-bold">Call us:</span> +91 91607 73883
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
