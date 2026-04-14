// Check if user already logged in
document.addEventListener('DOMContentLoaded', () => {
  const token = getToken();
  if (token) {
    window.location.href = '/dashboard.html';
  }
});

const toggleAuthForm = () => {
  document.getElementById('loginForm').classList.toggle('hidden');
  document.getElementById('registerForm').classList.toggle('hidden');
  document.getElementById('alertContainer').innerHTML = '';
};

const showAuthAlert = (message, type = 'success') => {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  
  const container = document.getElementById('alertContainer');
  container.innerHTML = '';
  container.appendChild(alertDiv);
};

const handleLogin = async () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showAuthAlert('Vui lòng nhập đầy đủ thông tin', 'error');
    return;
  }

  try {
    const response = await authAPI.login(email, password);
    
    // Lưu token và user
    setToken(response.token);
    setUser(response.user);

    showAuthAlert('Đăng nhập thành công! Đang chuyển hướng...', 'success');
    
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 1500);
  } catch (error) {
    showAuthAlert(error.message, 'error');
  }
};

const handleRegister = async () => {
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;

  if (!username || !email || !password || !confirmPassword) {
    showAuthAlert('Vui lòng nhập đầy đủ thông tin', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showAuthAlert('Mật khẩu không trùng khớp', 'error');
    return;
  }

  if (password.length < 6) {
    showAuthAlert('Mật khẩu phải ít nhất 6 ký tự', 'error');
    return;
  }

  try {
    const response = await authAPI.register(username, email, password, confirmPassword);
    
    // Lưu token và user
    setToken(response.token);
    setUser(response.user);

    showAuthAlert('Đăng ký thành công! Đang chuyển hướng...', 'success');
    
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 1500);
  } catch (error) {
    showAuthAlert(error.message, 'error');
  }
};
