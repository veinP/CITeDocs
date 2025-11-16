import { useState } from 'react';
import { User } from '../../users/User';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = (email, password) => {
    setError(null);
    if (email === 'registrar@cit.edu' && password === '12345') {
      const adminUser = new User('1', 'Registrar User', email, 'registrar');
      setUser(adminUser);
      return adminUser;
    } else if (email === 'student@cit.edu' && password === '12345') {
      const studentUser = new User('2', 'John Doe', email, 'student', '20-2423-001');
      setUser(studentUser);
      return studentUser;
    } else {
      setError('Invalid credentials. Try admin@cit.edu/admin123 or student@cit.edu/student123');
      return null;
    }
  };

  const forgotPassword = (email) => {
    setError(null);

    if (email === 'registrar@cit.edu') {
      return 'A password reset link has been sent to registrar@cit.edu';
    }
    if (email === 'student@cit.edu') {
      return 'A password reset link has been sent to student@cit.edu';
    }
    setError('Email not found in the system.');
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  return { user, error, login, logout, forgotPassword};
}