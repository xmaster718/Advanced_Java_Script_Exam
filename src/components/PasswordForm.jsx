import { useState } from 'react'

// Форма с контролируемым полем и проверкой ввода.
export default function PasswordForm({ onSubmit, loading }) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!password) return setError('Введите пароль')
    if (password.length > 128) return setError('Пароль слишком длинный (максимум 128 символов)')
    setError('')
    onSubmit(password)
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="row">
        <input
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          autoComplete="off"
          aria-label="Пароль"
        />
        <button type="button" className="ghost" onClick={() => setShow((s) => !s)}>
          {show ? 'Скрыть' : 'Показать'}
        </button>
      </div>
      {error && <p className="err">{error}</p>}
      <button type="submit" disabled={loading} className="full">
        {loading ? 'Проверяю…' : 'Проверить'}
      </button>
      <div className="chips">
        Примеры:
        {['password', '123456', 'Qwerty123!'].map((s) => (
          <button key={s} type="button" className="ghost small" onClick={() => setPassword(s)}>
            {s}
          </button>
        ))}
      </div>
    </form>
  )
}
