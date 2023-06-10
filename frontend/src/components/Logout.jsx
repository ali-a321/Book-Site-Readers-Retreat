import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    navigate('/');
    
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
