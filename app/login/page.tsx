'use client'

import { Suspense } from 'react'
import LoginPage from './LoginContent'

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  )
}
