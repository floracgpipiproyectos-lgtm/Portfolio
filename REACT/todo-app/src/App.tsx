import React, { useState, useEffect } from 'react'
import type { SubmitEvent, ChangeEvent, KeyboardEvent } from 'react'
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom'
import './App.css'

// Types
interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  avatar: string;
}

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

interface ImagePost {
  id: number;
  url: string;
  title: string;
  author: string;
  likes: number;
  comments: Comment[];
  likedByUser: boolean;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
}

// Initial mock data
const initialTasks: Task[] = [
  { id: 1, title: 'Actualizar documentación del proyecto', status: 'in-progress', priority: 'medium', assignee: 'admin', dueDate: '2024-03-15' },
  { id: 2, title: 'Revisar código del módulo de usuarios', status: 'pending', priority: 'high', assignee: 'admin', dueDate: '2024-03-14' },
  { id: 3, title: 'Implementar nuevo diseño del dashboard', status: 'completed', priority: 'high', assignee: 'admin', dueDate: '2024-03-10' },
  { id: 4, title: 'Testing de integración API REST', status: 'pending', priority: 'medium', assignee: 'admin', dueDate: '2024-03-18' },
]

const initialImages: ImagePost[] = [
  { id: 1, url: 'https://picsum.photos/400/300?random=1', title: 'Paisaje Montañoso', author: 'user1', likes: 24, comments: [{ id: 1, author: 'user2', text: '¡Hermosa vista!', time: '2h' }], likedByUser: false },
  { id: 2, url: 'https://picsum.photos/400/300?random=2', title: 'Atardecer en la Playa', author: 'user2', likes: 45, comments: [], likedByUser: false },
  { id: 3, url: 'https://picsum.photos/400/300?random=3', title: 'Ciudad de Noche', author: 'user3', likes: 32, comments: [{ id: 1, author: 'user1', text: 'Increíble', time: '1h' }], likedByUser: false },
  { id: 4, url: 'https://picsum.photos/400/300?random=4', title: 'Naturaleza Verde', author: 'user1', likes: 18, comments: [], likedByUser: false },
  { id: 5, url: 'https://picsum.photos/400/300?random=5', title: 'Arte Urbano', author: 'user4', likes: 56, comments: [{ id: 1, author: 'user2', text: 'Muy creativo', time: '3h' }], likedByUser: false },
  { id: 6, url: 'https://picsum.photos/400/300?random=6', title: 'Mar y Cielo', author: 'user2', likes: 27, comments: [], likedByUser: false },
]

// Login Page
function LoginPage({ onLogin }: { onLogin: (user: User) => void }) {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    if (isRegister) {
      const newUser: User = {
        id: Date.now(),
        username,
        email,
        name: name || username,
        avatar: '👤'
      }
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      onLogin(newUser)
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u: User) => u.username === username || u.email === username)
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        onLogin(user)
      } else {
        alert('Usuario no encontrado. Regístrate primero.')
      }
    }
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">📊</span>
          <h1>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h1>
          <p>AdminPro Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <>
              <label htmlFor="name" className="form-label">Nombre completo</label>
              <input id="name" type="text" placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
            </>
          )}
          <label htmlFor="username" className="form-label">Usuario o Email</label>
          <input id="username" type="text" placeholder="Usuario o Email" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input" required />
          <label htmlFor="email" className="form-label">Email</label>
          <input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required={isRegister} />
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input id="password" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required />
          <button type="submit" className="auth-btn">{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</button>
        </form>
        <p className="auth-toggle">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
          <button onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Iniciar Sesión' : 'Registrarse'}</button>
        </p>
      </div>
    </div>
  )
}

// Layout Component
function Layout({ children, user, onLogout }: { children: React.ReactNode; user: User; onLogout: () => void }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('dashboard-theme') === 'dark')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('dashboard-theme', darkMode ? 'dark' : 'light')
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  const navItems = [
    { path: '/dashboard', icon: '📈', label: 'Dashboard' },
    { path: '/gallery', icon: '🖼️', label: 'Galería' },
    { path: '/tasks', icon: '✅', label: 'Tareas' },
    { path: '/users', icon: '👥', label: 'Usuarios' },
    { path: '/settings', icon: '⚙️', label: 'Configuración' },
  ]

  const searchResults = searchQuery.trim() 
    ? navItems.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.path.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowSearchResults(e.target.value.length > 0)
  }

  const handleSearchResultClick = (path: string) => {
    navigate(path)
    setSearchQuery('')
    setShowSearchResults(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchQuery('')
      setShowSearchResults(false)
    }
  }

  return (
    <div className={`app-layout ${darkMode ? 'dark' : ''}`}>
      <aside className="layout-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">AdminPro</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-avatar">{user.avatar}</span>
            <span className="user-name">{user.name}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">Cerrar Sesión</button>
        </div>
      </aside>
      <main className="layout-main">
        <header className="layout-header">
          <div className="search-container">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar página..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
              onKeyDown={handleKeyDown}
              aria-label="Buscar en el dashboard"
            />
            {showSearchResults && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <div
                      key={result.path}
                      className="search-result-item"
                      onClick={() => handleSearchResultClick(result.path)}
                    >
                      <span className="result-icon">{result.icon}</span>
                      <div>
                        <div className="result-label">{result.label}</div>
                        <div className="result-path">{result.path}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No se encontraron resultados</div>
                )}
              </div>
            )}
          </div>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Cambiar tema">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>
        <div className="layout-content">{children}</div>
      </main>
    </div>
  )
}

// Dashboard Page
function DashboardPage({ user }: { user: User }) {
  const stats = [
    { label: 'Imágenes', value: '156', change: '+12%', icon: '🖼️', colorClass: 'stat-icon-purple' },
    { label: 'Usuarios', value: '2,847', change: '+8%', icon: '👥', colorClass: 'stat-icon-green' },
    { label: 'Tareas', value: '23', change: '-5%', icon: '✅', colorClass: 'stat-icon-pink' },
    { label: 'Visitas', value: '12.5K', change: '+15%', icon: '👁️', colorClass: 'stat-icon-blue' },
  ]

  const chartHeights = ['chart-bar-h-40', 'chart-bar-h-65', 'chart-bar-h-45', 'chart-bar-h-80', 'chart-bar-h-55', 'chart-bar-h-90', 'chart-bar-h-70', 'chart-bar-h-85', 'chart-bar-h-60', 'chart-bar-h-75', 'chart-bar-h-95', 'chart-bar-h-80']

  return (
    <div className="dashboard-page">
      <h1>Bienvenido, {user.name} 👋</h1>
      <p className="page-subtitle">Aquí está el resumen de tu actividad</p>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <span className={`stat-icon ${stat.colorClass}`}>{stat.icon}</span>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
            <span className="stat-change">{stat.change}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-widgets">
        <div className="widget">
          <h3>📊 Actividad Reciente</h3>
          <div className="activity-list">
            <div className="activity-item">🖼️ Subiste una nueva imagen</div>
            <div className="activity-item">❤️ Diste like a 5 fotos</div>
            <div className="activity-item">💬 Comentariste en 3 publicaciones</div>
            <div className="activity-item">✅ Completaste 2 tareas</div>
          </div>
        </div>
        <div className="widget">
          <h3>📈 Estadísticas</h3>
          <div className="mini-chart">
            {chartHeights.map((heightClass, i) => (
              <div key={i} className={`chart-bar ${heightClass}`}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Gallery Page
function GalleryPage({ user }: { user: User }) {
  const [images, setImages] = useState<ImagePost[]>(() => {
    const saved = localStorage.getItem('galleryImages')
    return saved ? JSON.parse(saved) : initialImages
  })
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    localStorage.setItem('galleryImages', JSON.stringify(images))
  }, [images])

  const handleLike = (id: number) => {
    setImages(images.map(img => {
      if (img.id === id) {
        return {
          ...img,
          likes: img.likedByUser ? img.likes - 1 : img.likes + 1,
          likedByUser: !img.likedByUser
        }
      }
      return img
    }))
  }

  const handleComment = (id: number) => {
    if (!newComment[id]?.trim()) return
    setImages(images.map(img => {
      if (img.id === id) {
        return {
          ...img,
          comments: [...img.comments, { id: Date.now(), author: user.username, text: newComment[id], time: 'Ahora' }]
        }
      }
      return img
    }))
    setNewComment({ ...newComment, [id]: '' })
  }

  return (
    <div className="gallery-page">
      <h1>🖼️ Galería de Imágenes</h1>
      <p className="page-subtitle">Explora, likea y comenta imágenes</p>
      
      <div className="gallery-grid">
        {images.map(image => (
          <div key={image.id} className="gallery-card">
            <img src={image.url} alt={image.title} className="gallery-image" />
            <div className="gallery-info">
              <h3>{image.title}</h3>
              <p className="gallery-author">Por @{image.author}</p>
              <div className="gallery-actions">
                <button className={`like-btn ${image.likedByUser ? 'liked' : ''}`} onClick={() => handleLike(image.id)}>
                  {image.likedByUser ? '❤️' : '🤍'} {image.likes}
                </button>
                <span className="comment-count">💬 {image.comments.length}</span>
              </div>
              <div className="comments-section">
                {image.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <strong>@{comment.author}</strong>: {comment.text}
                  </div>
                ))}
                <div className="comment-input">
                  <label htmlFor={`comment-${image.id}`} className="sr-only">Escribir comentario</label>
                  <input 
                    id={`comment-${image.id}`}
                    type="text" 
                    placeholder="Escribe un comentario..."
                    value={newComment[image.id] || ''}
                    onChange={(e) => setNewComment({ ...newComment, [image.id]: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleComment(image.id)}
                  />
                  <button onClick={() => handleComment(image.id)}>Enviar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Tasks Page
function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : initialTasks
  })
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)

  const toggleStatus = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed'
        return { ...task, status: newStatus }
      }
      return task
    }))
  }

  return (
    <div className="tasks-page">
      <h1>✅ Mis Tareas</h1>
      <p className="page-subtitle">Gestiona tus tareas pendientes</p>
      
      <div className="task-filters">
        {(['all', 'pending', 'in-progress', 'completed'] as const).map(f => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'Todas' : f === 'in-progress' ? 'En Progreso' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="tasks-list">
        {filteredTasks.map(task => (
          <div key={task.id} className={`task-card ${task.status}`}>
            <button className="task-check" onClick={() => toggleStatus(task.id)}>
              {task.status === 'completed' ? '✓' : '○'}
            </button>
            <div className="task-info">
              <span className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>{task.title}</span>
              <span className="task-meta">
                <span className={`priority ${task.priority}`}>{task.priority}</span>
                <span className="due-date">📅 {task.dueDate}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Users Page
function UsersPage() {
  const users = [
    { id: 1, name: 'Administrador', username: 'admin', email: 'admin@admin.com', avatar: '👨‍💼', role: 'Admin' },
    { id: 2, name: 'Usuario Demo', username: 'usuario1', email: 'user@user.com', avatar: '👤', role: 'Usuario' },
  ]

  return (
    <div className="users-page">
      <h1>👥 Gestión de Usuarios</h1>
      <p className="page-subtitle">Administra los usuarios del sistema</p>
      
      <div className="users-grid">
        {users.map(u => (
          <div key={u.id} className="user-card">
            <span className="user-avatar">{u.avatar}</span>
            <div className="user-details">
              <h3>{u.name}</h3>
              <p>@{u.username}</p>
              <p className="user-email">{u.email}</p>
            </div>
            <span className={`user-role ${u.role.toLowerCase()}`}>{u.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Settings Page
function SettingsPage({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const handleSave = () => {
    alert('Configuración guardada (demo)')
  }

  return (
    <div className="settings-page">
      <h1>⚙️ Configuración</h1>
      <p className="page-subtitle">Administra tu cuenta</p>
      
      <div className="settings-card">
        <div className="setting-group">
          <label htmlFor="settings-name">Nombre</label>
          <input id="settings-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
        </div>
        <div className="setting-group">
          <label htmlFor="settings-email">Email</label>
          <input id="settings-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
        </div>
        <div className="setting-group">
          <label htmlFor="settings-username">Usuario</label>
          <input id="settings-username" type="text" value={user.username} disabled className="form-input disabled" />
        </div>
        <button onClick={handleSave} className="save-btn">Guardar Cambios</button>
      </div>

      <div className="settings-card danger">
        <h3>🔴 Zona Peligrosa</h3>
        <button onClick={onLogout} className="logout-btn-full">Cerrar Sesión</button>
      </div>
    </div>
  )
}

// Main App
function App() {
  // Check if user came from portfolio - if so, force login page
  const isFromPortfolio = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('from') === 'portfolio'
  }

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    // If force login from portfolio, don't restore session
    if (isFromPortfolio()) {
      return null
    }
    const saved = localStorage.getItem('currentUser')
    return saved ? JSON.parse(saved) : null
  })

  // Clear saved user if force login from portfolio
  useEffect(() => {
    if (isFromPortfolio()) {
      localStorage.removeItem('currentUser')
    }
  }, [])

  const handleLogin = (user: User) => {
    setCurrentUser(user)
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (!users.find((u: User) => u.username === user.username)) {
      localStorage.setItem('users', JSON.stringify([...users, user]))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <Layout user={currentUser} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage user={currentUser} />} />
        <Route path="/gallery" element={<GalleryPage user={currentUser} />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<SettingsPage user={currentUser} onLogout={handleLogout} />} />
      </Routes>
    </Layout>
  )
}

export default App

