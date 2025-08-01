// utils/auth.ts
export const users = [
    { username: 'IqbalG', password: 'IqbalG', role: 'collect' },
    { username: 'Iqbal1', password: 'iqbal2', role: 'tpmt' },
  ];
  
  export const login = (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    return null;
  };
  
  export const logout = () => {
    localStorage.removeItem('user');
  };
  
  export const getUser = () => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  };
  