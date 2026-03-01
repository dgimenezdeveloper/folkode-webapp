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
  const[passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const[loginError, setLoginError] = useState<string | null>(
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
    const newValue = e.target.value
    setEmail(newValue)
    setEmailError(validateEmail(newValue))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setPassword(newValue)
    setPasswordError(validatePassword(newValue))
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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a] px-4 sm:px-6 relative overflow-hidden font-sans selection:bg-[#86A869]/30">
      
      {/* Background decoration: Blobs animados */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_15%_15%,rgba(134,168,105,0.12),transparent_40%)] animate-pulse duration-[4000ms]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_85%_85%,rgba(51,131,183,0.12),transparent_40%)] animate-pulse duration-[5000ms]" />
      </div>

      <div className="w-full max-w-md relative z-10 py-6 sm:py-10 animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
        
        {/* Encabezado y Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="relative group cursor-default">
            {/* Brillo dinámico detrás del logo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#86A869] to-[#3383B7] rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition duration-700"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-[#0f1520] rounded-2xl p-0.5 border border-white/10 mb-6 shadow-2xl">
              <Image
                src="/folkode-logo.webp"
                alt="Folkode Logo"
                width={56}
                height={56}
                className="rounded-xl w-14 h-14 object-contain"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 mb-3 tracking-tight">
            Panel de Administración
          </h1>
          <p className="text-[#8ba3b8] text-sm sm:text-base px-4 font-medium">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* Tarjeta de Formulario Principal - Glassmorphism Premium */}
        <div className="bg-[#0f1520]/80 backdrop-blur-2xl rounded-2xl border border-white/4 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] p-6 sm:p-8 w-full relative overflow-hidden">
          
          {/* Reflejo de luz superior */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-2">
              <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-semibold m-0">{loginError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            
            {/* Campo Correo */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-[#8ba3b8] ml-1 tracking-wide">
                Correo electrónico
              </label>
              <div className={`group flex items-stretch h-[56px] bg-[#1a2332] border rounded-3xl overflow-hidden transition-all duration-300 ${
                emailError 
                  ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                  : 'border-white/5 focus-within:border-[#86A869]/70 focus-within:bg-[#1e293b] focus-within:shadow-[0_0_20px_rgba(134,168,105,0.15)] hover:border-white/10'
              }`}>
                <div className="flex items-center justify-center pl-4 pr-3 sm:px-4 bg-transparent">
                  <FiMail className={`w-5 h-5 transition-colors duration-300 ${
                    emailError ? 'text-red-400' : 'text-gray-500 group-focus-within:text-[#86A869]'
                  }`} aria-hidden="true" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isLoading}
                  className="flex-1 w-full h-full !bg-transparent border-none outline-none focus:ring-0 text-base sm:text-sm text-white placeholder:text-gray-600 focus:placeholder-transparent placeholder:transition-colors px-0 m-0 font-medium"
                  placeholder="admin@folkode.com"
                  style={{ WebkitBoxShadow: '0 0 0px 1000px #1a2332 inset', WebkitTextFillColor: '#ffffff' }}
                />
              </div>
              {emailError && (
                <p className="text-red-400 text-xs flex items-center gap-1.5 font-semibold ml-1 animate-in slide-in-from-left-1" role="alert">
                  <FiAlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-[#8ba3b8] ml-1 tracking-wide">
                Contraseña
              </label>
              <div className={`group flex items-stretch h-[56px] bg-[#1a2332] border rounded-3xl overflow-hidden transition-all duration-300 ${
                passwordError 
                  ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                  : 'border-white/5 focus-within:border-[#86A869]/70 focus-within:bg-[#1e293b] focus-within:shadow-[0_0_20px_rgba(134,168,105,0.15)] hover:border-white/10'
              }`}>
                <div className="flex items-center justify-center pl-4 pr-3 sm:px-4 bg-transparent">
                  <FiLock className={`w-5 h-5 transition-colors duration-300 ${
                    passwordError ? 'text-red-400' : 'text-gray-500 group-focus-within:text-[#86A869]'
                  }`} aria-hidden="true" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  className="flex-1 w-full h-full !bg-transparent border-none outline-none focus:ring-0 text-base sm:text-sm text-white placeholder:text-gray-600 focus:placeholder-transparent placeholder:transition-colors px-0 m-0 tracking-widest font-medium"
                  placeholder="••••••••"
                  style={{ WebkitBoxShadow: '0 0 0px 1000px #1a2332 inset', WebkitTextFillColor: '#ffffff' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || !password}
                  className="flex items-center justify-center px-4 bg-transparent text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:text-[#86A869] disabled:opacity-50"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" aria-hidden="true" /> : <FiEye className="w-5 h-5" aria-hidden="true" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-400 text-xs flex items-center gap-1.5 font-semibold ml-1 animate-in slide-in-from-left-1" role="alert">
                  <FiAlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  <span>{passwordError}</span>
                </p>
              )}
            </div>

            {/* Recordar Usuario */}
            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                role="checkbox"
                aria-checked={rememberMe}
                onClick={() => setRememberMe(!rememberMe)}
                disabled={isLoading}
                className="flex items-center gap-3 text-sm font-medium text-[#8ba3b8] hover:text-white transition-colors focus:outline-none group disabled:opacity-50 py-1"
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${
                  rememberMe 
                    ? 'bg-gradient-to-br from-[#86A869] to-[#3383B7] border-transparent shadow-[0_0_10px_rgba(134,168,105,0.3)]' 
                    : 'bg-[#1a2332] border-gray-600 group-hover:border-[#86A869]/50'
                }`}>
                  {rememberMe && (
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
              disabled={isLoading || !!emailError || !!passwordError || !email || !password}
              className="relative w-full h-[56px] mt-4 bg-gradient-to-r from-[#86A869] to-[#3383B7] hover:from-[#92b575] hover:to-[#3b93cc] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white text-base font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(134,168,105,0.3)] hover:shadow-[0_0_30px_rgba(51,131,183,0.4)] overflow-hidden group"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
              {isLoading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <span>Iniciar sesión</span>
              )}
            </button>
          </form>

          {/* Volver */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#8ba3b8] hover:text-white transition-colors font-semibold group py-2">
              <span className="group-hover:-translate-x-1.5 transition-transform duration-300">←Volver al sitio</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[#5c738a] font-medium text-xs mt-8 px-4">
          © {new Date().getFullYear()} Folkode. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}

function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a]">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#1e2a3a]"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#86A869] border-t-transparent animate-spin"></div>
        </div>
        <p className="text-[#8ba3b8] font-semibold animate-pulse tracking-wide">Cargando Folkode...</p>
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