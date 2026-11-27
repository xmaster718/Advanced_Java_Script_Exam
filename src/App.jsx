import { useEffect, useState } from 'react'
import { sha1Hex, parseRange, API, PREFIX_LEN } from './hash.js'
import PasswordForm from './components/PasswordForm.jsx'
import ResultCard from './components/ResultCard.jsx'
import ServerRequestInfo from './components/ServerRequestInfo.jsx'
import HashList from './components/HashList.jsx'

export default function App() {
  const [query, setQuery] = useState(null) // { prefix, suffix }
  const [status, setStatus] = useState('idle') // idle | loading | error | empty | done
  const [error, setError] = useState('')
  const [rows, setRows] = useState([])

  async function check(password) {
    const hash = await sha1Hex(password)
    setQuery({ prefix: hash.slice(0, PREFIX_LEN), suffix: hash.slice(PREFIX_LEN) })
  }

  // Запрос к API с состояниями loading / error / empty
  useEffect(() => {
    if (!query) return
    const ctrl = new AbortController()
    setStatus('loading')
    setError('')
    fetch(API + query.prefix, { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error('Сервер ответил кодом ' + r.status)
        return r.text()
      })
      .then((text) => {
        const parsed = parseRange(text)
        setRows(parsed)
        setStatus(parsed.length === 0 ? 'empty' : 'done')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(navigator.onLine ? err.message : 'Нет подключения к интернету')
        setStatus('error')
      })
    return () => ctrl.abort()
  }, [query])

  const match = query ? rows.find((r) => r.suffix === query.suffix) : null

  return (
    <main>
      <h1>🔐 Проверка пароля по базе утечек</h1>
      <p className="sub">
        Пароль и его полный хеш не покидают браузер — на сервер уходят только первые {PREFIX_LEN} символов хеша.
      </p>

      <PasswordForm onSubmit={check} loading={status === 'loading'} />

      {status === 'loading' && <div className="card">⏳ Загрузка ответа от сервера…</div>}
      {status === 'error' && (
        <div className="card bad"><h2>Ошибка запроса</h2><p>{error}</p></div>
      )}
      {status === 'empty' && (
        <div className="card"><h2>Ответ пуст</h2><p>Сервер не вернул ни одного хеша для этого префикса.</p></div>
      )}
      {status === 'done' && (
        <>
          <ResultCard match={match} total={rows.length} />
          <ServerRequestInfo prefix={query.prefix} suffix={query.suffix} total={rows.length} />
          <HashList rows={rows} prefix={query.prefix} matchSuffix={match?.suffix} />
        </>
      )}
    </main>
  )
}
