import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log("Login attempt with:", email, password);
      }, 2000);
    }
  };

  const validateFields = () => {
    setIsValidating(true);
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.email = "Email inválido";
      valid = false;
    }
    if (password.length < 8) {
      newErrors.password = "Senha deve ter no mínimo 8 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    setTimeout(() => setIsValidating(false), 1000);
    return valid;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      document.documentElement.style.setProperty("--hue", Math.random() * 360);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="relative w-96">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        <div className="relative bg-black bg-opacity-70 p-8 rounded-3xl shadow-2xl backdrop-blur-sm w-full flex flex-col justify-between">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Login Futurista
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border-b-2 border-purple-500 focus:outline-none focus:border-pink-500 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Email"
                required
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border-b-2 border-purple-500 focus:outline-none focus:border-pink-500 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Senha"
                required
              />
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300"
              disabled={isLoading || isValidating}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processando...
                </span>
              ) : isValidating ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    className="w-6 h-6 border-2 border-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  Validando...
                </span>
              ) : (
                "Entrar"
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
