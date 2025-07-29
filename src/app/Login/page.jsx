
'use client';

import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Log In</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <button type="button" style={{ backgroundColor: '#1DA1F2', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Log In
        </button>
        <p style={{ textAlign: 'center', color: '#1DA1F2' }}>Forgot Password?</p>
        <p style={{ textAlign: 'center', color: '#1DA1F2', cursor: 'pointer' }} onClick={() => router.push('/')}>
          OR Log in with
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <span>🔒</span>
          <span>🇬</span>
          <span>@</span>
        </div>
        <p style={{ textAlign: 'center', color: '#1DA1F2', cursor: 'pointer' }} onClick={() => router.push('/Signup')}>
          Don't have an account? Sign Up
        </p>
      </form>
    </div>
  );
}
