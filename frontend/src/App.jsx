import { useState } from "react";
import "./App.css";

const API = "";

function App() {
  const [mode, setMode] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    role: "employee",
  });

  const login = async (e) => {
    e.preventDefault();
    setMessage("Signing in...");

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setMessage("");
      loadProfile(data.token);
    } catch {
      setMessage("Backend connection failed");
    }
  };

  const register = async (e) => {
    e.preventDefault();
    setMessage("Creating employee...");

    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Employee registered successfully. Please login.");
      setMode("login");
    } catch {
      setMessage("Backend connection failed");
    }
  };

  const loadProfile = async (authToken = token) => {
    try {
      const response = await fetch(`${API}/api/employees/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.employee || data);
      } else {
        setMessage(data.message || "Unable to load profile");
      }
    } catch {
      setMessage("Unable to load profile");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setProfile(null);
  };

  if (token) {
    return (
      <div className="app">
        <header className="topbar">
          <div>
            <h1>Enterprise HR</h1>
            <span>Employee Management Platform</span>
          </div>

          <button className="logout" onClick={logout}>
            Logout
          </button>
        </header>

        <main className="dashboard">
          <section className="welcome">
            <p className="eyebrow">EMPLOYEE PORTAL</p>
            <h2>Welcome to your workspace 👋</h2>
            <p>Manage your employee information from one place.</p>
          </section>

          {message && <div className="message">{message}</div>}

          <section className="cards">
            <div className="card">
              <span className="card-icon">👤</span>
              <h3>My Profile</h3>
              <p>View your employee information</p>
              <button onClick={() => loadProfile()}>Load Profile</button>
            </div>

            <div className="card">
              <span className="card-icon">📅</span>
              <h3>Leave Management</h3>
              <p>Apply and track your leaves</p>
              <button onClick={() => setMessage("Leave module ready")}>
                Open Leaves
              </button>
            </div>

            <div className="card">
              <span className="card-icon">🎫</span>
              <h3>Support Tickets</h3>
              <p>Raise and track support tickets</p>
              <button onClick={() => setMessage("Ticket module ready")}>
                Open Tickets
              </button>
            </div>
          </section>

          {profile && (
            <section className="profile">
              <h2>Employee Profile</h2>

              <div className="profile-grid">
                <div>
                  <span>Full Name</span>
                  <strong>{profile.fullName}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{profile.email}</strong>
                </div>

                <div>
                  <span>Department</span>
                  <strong>{profile.department || "Not assigned"}</strong>
                </div>

                <div>
                  <span>Designation</span>
                  <strong>{profile.designation || "Not assigned"}</strong>
                </div>

                <div>
                  <span>Role</span>
                  <strong>{profile.role}</strong>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="brand">Enterprise HR</div>

        <div className="hero-content">
          <p className="eyebrow">EMPLOYEE MANAGEMENT PLATFORM</p>
          <h1>Manage your workforce with confidence.</h1>
          <p>
            A centralized platform for employees, HR teams, and administrators.
          </p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          Kubernetes deployment online
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <div className="tabs">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
            >
              Login
            </button>

            <button
              className={mode === "register" ? "active" : ""}
              onClick={() => {
                setMode("register");
                setMessage("");
              }}
            >
              Register
            </button>
          </div>

          {mode === "login" ? (
            <form onSubmit={login}>
              <h2>Welcome back</h2>
              <p className="form-subtitle">Sign in to your employee portal.</p>

              <label>Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                required
              />

              <button className="primary" type="submit">
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={register}>
              <h2>Create employee</h2>
              <p className="form-subtitle">
                Register an employee account.
              </p>

              <input
                placeholder="Full name"
                value={registerData.fullName}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    fullName: e.target.value,
                  })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value,
                  })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  })
                }
                required
              />

              <input
                placeholder="Department"
                value={registerData.department}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    department: e.target.value,
                  })
                }
              />

              <input
                placeholder="Designation"
                value={registerData.designation}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    designation: e.target.value,
                  })
                }
              />

              <select
                value={registerData.role}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    role: e.target.value,
                  })
                }
              >
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
                <option value="admin">Admin</option>
              </select>

              <button className="primary" type="submit">
                Create Account
              </button>
            </form>
          )}

          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
