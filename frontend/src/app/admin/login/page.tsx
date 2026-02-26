// login/page.tsx
'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { FiMail, FiLock, FiAlertCircle, FiLoader, FiEye, FiEyeOff } from 'react-icons/fi'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'
  const error = searchParams.get('error')

  // Estados
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Validaciones
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(
    error === 'CredentialsSignin' ? 'Credenciales inválidas' : null
  )

  const validateEmail = (value: string) => {
    if (!value) return 'El correo electrónico es requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Ingresa un formato válido'
    return ''
  }

  const validatePassword = (value: string) => {
    if (!value) return 'La contraseña es requerida'
    if (value.length < 6) return 'Mínimo 6 caracteres'
    return ''
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (emailError) setEmailError(validateEmail(e.target.value))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (passwordError) setPasswordError(validatePassword(e.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const currentEmailError = validateEmail(email)
    const currentPasswordError = validatePassword(password)
    
    if (currentEmailError || currentPasswordError) {
      setEmailError(currentEmailError)
      setPasswordError(currentPasswordError)
      return
    }

    setIsLoading(true)
    setLoginError(null)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        rememberMe: rememberMe.toString(),
        redirect: false,
      })

      if (result?.error) {
        setLoginError('Email o contraseña incorrectos')
        setIsLoading(false)
        return
      }

      router.push(callbackUrl)
      router.refresh()
    } catch {
      setLoginError('Ocurrió un error. Intenta de nuevo.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a] px-4 relative overflow-hidden font-sans selection:bg-[#86A869]/30">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_15%_15%,rgba(134,168,105,0.08),transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_85%_85%,rgba(51,131,183,0.08),transparent_40%)]" />
      </div>

      <div className="w-full max-w-md relative z-10 py-10 animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
        {/* Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#86A869] to-[#3383B7] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-[#0f1520] rounded-2xl p-0.5 border border-white/10 mb-6">
              <Image
                src="/folkode-logo.webp"
                alt="Folkode"
                width={48}
                height={48}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-500 text-sm">Ingresa tus credenciales para continuar</p>
        </div>

        {/* Tarjeta de Formulario Principal - Glassmorphism */}
        <div className="bg-[#0f1520]/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 w-full relative overflow-hidden">
          
          {/* Luz superior decorativa */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-2">
              <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium m-0">{loginError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            
            {/* Campo Correo */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">
                Correo electrónico
              </label>
              <div className={`group flex items-stretch h-[56px] bg-[#1e2a3a] border rounded-xl overflow-hidden transition-all duration-300 ${
                emailError 
                  ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                  : 'border-white/5 focus-within:border-[#86A869] focus-within:shadow-[0_0_15px_rgba(134,168,105,0.15)] hover:border-white/10'
              }`}>
                <div className="flex items-center justify-center px-4 bg-transparent">
                  <FiMail className={`w-5 h-5 transition-colors duration-300 ${
                    emailError ? 'text-red-400' : 'text-gray-500 group-focus-within:text-[#86A869]'
                  }`} />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => setEmailError(validateEmail(email))}
                  disabled={isLoading}
                  className="flex-1 w-full h-full !bg-transparent border-none outline-none focus:ring-0 text-white placeholder:text-gray-600 focus:placeholder-transparent placeholder:transition-colors px-0 m-0"
                  placeholder=" Correo electrónico"
                  style={{ 
                    WebkitBoxShadow: '0 0 0px 1000px #1e2a3a inset', 
                    WebkitTextFillColor: '#ffffff'
                  }}
                />
              </div>
              {emailError && (
                <p className="text-red-400 text-xs flex items-center gap-1.5 font-medium ml-1 animate-in slide-in-from-left-1">
                  <FiAlertCircle className="w-3.5 h-3.5" />
                  {emailError}
                </p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300 ml-1">
                Contraseña
              </label>
              <div className={`group flex items-stretch h-[56px] bg-[#1e2a3a] border rounded-xl overflow-hidden transition-all duration-300 ${
                passwordError 
                  ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                  : 'border-white/5 focus-within:border-[#86A869] focus-within:shadow-[0_0_15px_rgba(134,168,105,0.15)] hover:border-white/10'
              }`}>
                <div className="flex items-center justify-center px-4 bg-transparent">
                  <FiLock className={`w-5 h-5 transition-colors duration-300 ${
                    passwordError ? 'text-red-400' : 'text-gray-500 group-focus-within:text-[#86A869]'
                  }`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => setPasswordError(validatePassword(password))}
                  disabled={isLoading}
                  className="flex-1 w-full h-full !bg-transparent border-none outline-none focus:ring-0 text-white placeholder:text-gray-600 focus:placeholder-transparent placeholder:transition-colors px-0 m-0 tracking-widest"
                  placeholder=" Contraseña"
                  style={{ 
                    WebkitBoxShadow: '0 0 0px 1000px #1e2a3a inset', 
                    WebkitTextFillColor: '#ffffff'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="flex items-center justify-center px-4 bg-transparent text-gray-500 hover:text-white transition-colors focus:outline-none disabled:opacity-50"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-400 text-xs flex items-center gap-1.5 font-medium ml-1 animate-in slide-in-from-left-1">
                  <FiAlertCircle className="w-3.5 h-3.5" />
                  {passwordError}
                </p>
              )}
            </div>

            {/* Recordar Usuario */}
            <div className="flex items-center justify-between mt-1">
              <button
                type="button"
                role="checkbox"
                aria-checked={rememberMe}
                onClick={() => setRememberMe(!rememberMe)}
                disabled={isLoading}
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors focus:outline-none group disabled:opacity-50"
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  rememberMe 
                    ? 'bg-[#86A869] border-[#86A869]' 
                    : 'bg-transparent border-gray-600 group-hover:border-[#86A869]'
                }`}>
                  {rememberMe && (
                    <svg className="w-3 h-3 text-[#0a0f1a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                Recordar usuario
              </button>
            </div>

            {/* Botón Iniciar Sesión */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[56px] mt-2 bg-gradient-to-r from-[#86A869] to-[#3383B7] hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#86A869]/20 hover:shadow-[#86A869]/30"
            >
              {isLoading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  Iniciando...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          {/* Volver */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#86A869] transition-colors font-medium group">
              <span className="group-hover:-translate-x-1 transition-transform">← Volver al sitio</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-8">
          © {new Date().getFullYear()} Folkode. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}

function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-[#86A869]/30 border-t-[#86A869] rounded-full animate-spin"></div>
        <p className="text-gray-400 font-medium animate-pulse">Cargando...</p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  )
}