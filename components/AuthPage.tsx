import React, { useState } from 'react';
import { User, Lock, ArrowRight, UserPlus, AlertCircle } from 'lucide-react';

interface AuthPageProps {
  onLogin: (username: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for better UX
    setTimeout(() => {
      try {
        const usersStr = localStorage.getItem('aps_users');
        const users = usersStr ? JSON.parse(usersStr) : [];

        if (isLogin) {
          // LOGIN LOGIC
          const user = users.find((u: any) => u.username === username && u.password === password);
          if (user) {
            onLogin(username);
          } else {
            setError('Username atau password salah.');
          }
        } else {
          // SIGN UP LOGIC
          if (username.length < 3) {
            setError('Username minimal 3 karakter.');
            setIsLoading(false);
            return;
          }
          if (password.length < 4) {
            setError('Password minimal 4 karakter.');
            setIsLoading(false);
            return;
          }
          
          if (users.find((u: any) => u.username === username)) {
            setError('Username sudah digunakan.');
          } else {
            const newUser = { username, password, createdAt: new Date().toISOString() };
            users.push(newUser);
            localStorage.setItem('aps_users', JSON.stringify(users));
            onLogin(username);
          }
        }
      } catch (err) {
        setError('Terjadi kesalahan sistem.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Graphic */}
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -ml-10 -mb-10 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-2xl mb-4 shadow-lg border border-slate-700">
               <User className="text-yellow-400 w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Aplikasi Penilaian Siswa</h1>
            <p className="text-slate-400 text-sm">Kelola data nilai dan KKTP dengan mudah.</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 bg-white flex-1">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-slate-800">
              {isLogin ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {isLogin ? 'Masuk untuk mengakses data penilaian Anda.' : 'Mulai kelola penilaian siswa Anda hari ini.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-start gap-2 border border-red-100 animate-pulse">
                <AlertCircle size={16} className="mt-0.5 shrink-0"/>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 font-medium"
                  placeholder="username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all mt-6
                ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-95'}
              `}
            >
              {isLoading ? (
                'Memproses...'
              ) : isLogin ? (
                <>Masuk Aplikasi <ArrowRight size={18} /></>
              ) : (
                <>Daftar Sekarang <UserPlus size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="ml-2 font-bold text-blue-600 hover:underline outline-none"
              >
                {isLogin ? 'Daftar disini' : 'Masuk disini'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};