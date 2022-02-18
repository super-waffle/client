import { useNavigate } from 'react-router-dom';
import '../statics/css/navbarLanding.css';

function NavbarLanding() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="auth-btns" sticky="top">
        <button className="landing landing-login" onClick={() => navigate('/login')} style={{ fontWeight: 'bold' }}>
          로그인
        </button>
        <button className="landing landing-signup" onClick={() => navigate('/signup')}>
          회원가입
        </button>
      </div>
    </div>
  );
}
export default NavbarLanding;
