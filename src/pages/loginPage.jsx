import {  Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import {Input} from "../components/UI/Input"


const Login = () => {
  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
  return <div className="min-h-screen w-full bg-gray-900 text-white relative flex items-center justify-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>

      <main className="relative z-10 grid md:grid-cols-2 items-center gap-16 w-full max-w-6xl p-8">
        <div className="hidden md:flex flex-col gap-4">
          <img src="/Thinkify_logo.png" alt="Thinkify Logo" className="w-20 h-20"/>
          <h1 className="text-5xl font-bold tracking-tight">Welcome Back to Thinkify</h1>
          <p className="text-gray-300 text-lg">
            Unlock your potential. Continue your journey through logic and code, one step at a time.
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="text-gray-400 mt-2">Enter your credentials to access your account.</p>
          </div>

          <form className="space-y-6">
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full bg-white/5 border-b-2 border-white/20 focus:border-teal-400 p-3 rounded-t-lg transition-all duration-300 outline-none"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-white/5 border-b-2 border-white/20 focus:border-teal-400 p-3 rounded-t-lg transition-all duration-300 outline-none"
              required
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 p-3 rounded-lg font-semibold shadow-lg shadow-teal-500/20 transition-all duration-300 transform hover:scale-105">
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-600" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-900/50 text-gray-400 rounded-full">Or</span></div>
            </div>
            <Button variant="outline" className="w-full mt-4 flex items-center justify-center gap-3 bg-white/10 border border-white/20 hover:bg-white/20 p-3 rounded-lg transition-colors">
              <GoogleIcon/>
              Continue with Google
            </Button>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="font-medium text-teal-400 hover:text-teal-300">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
};

export default Login;
