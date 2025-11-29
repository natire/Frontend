import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import InboxPage from './pages/InboxPage'
import TicketDetailPage from './pages/TicketDetailPage'
import DashboardPage from './pages/DashboardPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tickets" replace />} />
        <Route path="/tickets" element={<InboxPage />} />
        <Route path="/tickets/:id" element={<TicketDetailPage />} />
        <Route path="/analytics" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/tickets" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)