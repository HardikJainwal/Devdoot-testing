
'use client';

import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/Login');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>First Name *</label>
          <input type="text" placeholder="Enter your first name" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Enter your last name" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div>
          <label>Country & Phone *</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select style={{ padding: '8px', width: '20%' }}>
              <option>+91</option>
            </select>
            <input type="text" placeholder="Phone number" style={{ width: '80%', padding: '8px' }} />
          </div>
        </div>
        <div>
          <label>Email *</label>
          <input type="email" placeholder="Enter your email" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div>
          <label>Password *</label>
          <input type="password" placeholder="Enter password" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div>
          <label>Confirm Password *</label>
          <input type="password" placeholder="Confirm password" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <button type="button" style={{ backgroundColor: '#1DA1F2', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Sign Up
        </button>
        <p style={{ textAlign: 'center', color: '#1DA1F2', cursor: 'pointer' }} onClick={handleLoginRedirect}>
          Already have an account? Log In
        </p>
      </form>
    </div>
  );
}