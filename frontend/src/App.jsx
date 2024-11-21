import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
// Views imports:
import HomePage from './pages/LoginPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import StatisticsPage from './pages/StatisticsPage.jsx'
import CencoPage from './pages/CencoPage.jsx'
import SupervisorPage from './pages/SupervisorPage.jsx'
import Error404 from './pages/404.jsx'
import ReportDetailPage from './pages/ReportDetailPage.jsx'
import ReportsMapPage from './pages/ReportsMapPage.jsx'
import UsersPage from './pages/Admin/UsersPage.jsx'
import { ReportsProvider } from './contexts/ReportsContext.jsx'
// components

function App() {

  return (
    <AuthProvider>
      <ReportsProvider>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route element={<PrivateRoute/>}>
              <Route path='/cenco-dashboard' element={<CencoPage />} />
              <Route path='/supervisor-dashboard' element={<SupervisorPage />} />
              <Route path='/reports' element={<ReportsPage />} />
              <Route path='/reports-map' element={<ReportsMapPage />} />
              <Route path='/reports/:id' element={<ReportDetailPage />} />
              <Route path='/statistics' element={<StatisticsPage />} />
              <Route path='/admin/users' element={<UsersPage />}></Route>
            </Route>
            <Route path='/404' element={<Error404 />} />
            <Route path='*' element={<Navigate to="/404" />} />
          </Routes>
        </Router>
      </ReportsProvider>
    </AuthProvider>
  )
}

export default App
