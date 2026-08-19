'use client'

import { FormEvent, useEffect, useState } from 'react'
import { CheckCircle2, LockKeyhole, Send } from 'lucide-react'

type FormData = {
  nombre: string
  empresa: string
  cargo: string
  distrito: string
  email: string
  telefono: string
}

type Errors = Partial<Record<keyof FormData, string>>

const initialData: FormData = {
  nombre: '',
  empresa: '',
  cargo: '',
  distrito: '',
  email: '',
  telefono: '',
}

const fields: { id: keyof FormData; label: string; placeholder: string; type?: string; required?: boolean }[] = [
  { id: 'nombre', label: 'Nombre completo', placeholder: 'Escribe tu nombre', required: true },
  { id: 'empresa', label: 'Empresa', placeholder: 'Nombre de tu organización', required: true },
  { id: 'cargo', label: 'Cargo', placeholder: 'Tu cargo o función', required: true },
  { id: 'distrito', label: 'Distrito', placeholder: 'Selecciona tu distrito', required: true },
  { id: 'email', label: 'Correo electrónico', placeholder: 'nombre@empresa.com', type: 'email', required: true },
  { id: 'telefono', label: 'Número de teléfono', placeholder: '+51 999 999 999', type: 'tel', required: true },
]

function validate(data: FormData) {
  const errors: Errors = {}
  for (const field of fields) {
    if (!data[field.id].trim()) errors[field.id] = 'Este campo es obligatorio.'
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }
  if (data.telefono && !/^[+\d\s().-]{7,}$/.test(data.telefono)) {
    errors.telefono = 'Ingresa un número de teléfono válido.'
  }
  return errors
}

export function RegistrationForm() {
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Error al guardar')

      document.cookie = 'foro-gastronomico-registrado=true; max-age=31536000; path=/; SameSite=Lax'
      setSubmitted(true)
    } catch {
      setErrors({ nombre: 'Error al enviar. Intenta de nuevo.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-5 text-center" role="status">
        <div className="flex size-16 items-center justify-center rounded-full bg-sage text-cream">
          <CheckCircle2 aria-hidden="true" className="size-8" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-3xl text-ink">¡Registro confirmado!</h2>
          <p className="max-w-sm leading-relaxed text-ink/70">
            Gracias por registrarte. Te esperamos para compartir una experiencia llena de sabores, cultura y tradición.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form className="animate-form-in flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div className="flex flex-col gap-2" key={field.id}>
            <label className="text-sm font-semibold text-ink" htmlFor={field.id}>
              {field.label} <span className="text-wine" aria-hidden="true">*</span>
            </label>
            <input
              aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
              aria-invalid={Boolean(errors[field.id])}
              className="h-12 rounded-sm border border-ink/15 bg-cream px-4 text-sm text-ink outline-none transition duration-300 placeholder:text-ink/35 hover:border-ink/30 focus:border-wine focus:ring-2 focus:ring-wine/15 aria-[invalid=true]:border-wine"
              id={field.id}
              name={field.id}
              onChange={(event) => {
                setData({ ...data, [field.id]: event.target.value })
                if (errors[field.id]) setErrors({ ...errors, [field.id]: undefined })
              }}
              placeholder={field.placeholder}
              required={field.required}
              type={field.type ?? 'text'}
              value={data[field.id]}
            />
            {errors[field.id] && <p className="text-xs text-wine" id={`${field.id}-error`}>{errors[field.id]}</p>}
          </div>
        ))}
      </div>
      <button className="mt-2 inline-flex h-13 items-center justify-center gap-2 rounded-sm bg-wine px-6 text-sm font-bold text-cream transition hover:bg-wine/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine disabled:cursor-not-allowed disabled:opacity-70" disabled={submitting} type="submit">
        <Send aria-hidden="true" className="size-4" />
        {submitting ? 'Enviando...' : 'Confirmar registro'}
      </button>
      <p className="flex items-center justify-center gap-2 text-center text-xs text-ink/50">
        <LockKeyhole aria-hidden="true" className="size-3.5" /> Tus datos serán tratados de forma segura.
      </p>
    </form>
  )
}

export function AlreadyRegistered() {
  const [registered, setRegistered] = useState(false)
  useEffect(() => {
    setRegistered(document.cookie.includes('foro-gastronomico-registrado=true'))
  }, [])
  if (!registered) return null
  return (
    <div className="border border-sage/30 bg-sage/10 px-4 py-3 text-center text-sm text-ink" role="alert">
      Ya has enviado este formulario desde este navegador. Si necesitas actualizar tus datos, comunícate con la organización.
    </div>
  )
}

export function RegistrationGate() {
  const [registered, setRegistered] = useState(false)
  useEffect(() => {
    setRegistered(document.cookie.includes('foro-gastronomico-registrado=true'))
  }, [])
  return registered ? <AlreadyRegistered /> : <RegistrationForm />
}
