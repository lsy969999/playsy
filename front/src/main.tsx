import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout.tsx'
import Home from './pages/Home.tsx'
import TestLayout from './layout/test/TestLayout.tsx'
import TestChat from './pages/test/TestChat.tsx'
import TestR3f from './pages/test/TestR3f.tsx'
import Error from './pages/Error.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes >
        <Route path='/' element={ <Layout/> } errorElement={ <Error /> }>
          <Route index element={ <Home/>} />
        </Route>
        <Route path='/test' element={ <TestLayout/> } >
          <Route path='chat' element={ <TestChat/>} />
          <Route path='r3f' element={ <TestR3f/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
