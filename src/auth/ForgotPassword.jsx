import { motion } from 'framer-motion';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-card rounded-2xl border border-border p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-dark mb-6 font-[family-name:var(--font-poppins)]">
          Reset Password
        </h2>
        <p className="text-muted text-sm text-center mb-6">
          Enter your email to receive password reset instructions.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/20" placeholder="Enter your email" />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors">
            Send Reset Link
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
