import { useEffect, useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import SharePage from './components/SharePage'

import { exchangeCodeForToken } from './auth/token'

export default function App() {

  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {

    async function handleAuth() {

      try {

        const params =
          new URLSearchParams(window.location.search)

        const code =
          params.get('code')

        if (code) {

          const tokens =
            await exchangeCodeForToken(code)

          localStorage.setItem(
            'access_token',
            tokens.access_token
          )

          localStorage.setItem(
            'id_token',
            tokens.id_token
          )

          localStorage.setItem(
            'refresh_token',
            tokens.refresh_token
          )

          window.history.replaceState(
            {},
            document.title,
            '/'
          )

          setAuthenticated(true)

        } else {

          const token =
            localStorage.getItem('id_token')

          if (token) {
            setAuthenticated(true)
          }
        }

      } catch (err) {

        console.error(err)

        localStorage.clear()

      } finally {

        setLoading(false)
      }
    }

    handleAuth()

  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            authenticated
              ? <Dashboard />
              : <Login />
          }
        />

        {/* SHARE PAGE (IMPORTANT) */}
        <Route
          path="/share/:token"
          element={<SharePage />}
        />

      </Routes>

    </BrowserRouter>
  )
}
