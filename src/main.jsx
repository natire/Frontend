import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import InboxPage from './pages/InboxPage'
import TicketDetailPage from './pages/TicketDetailPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta de login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rutas protegidas */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Navigate to="/tickets" replace />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tickets" 
          element={
            <ProtectedRoute>
              <InboxPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tickets/:id" 
          element={
            <ProtectedRoute>
              <TicketDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)