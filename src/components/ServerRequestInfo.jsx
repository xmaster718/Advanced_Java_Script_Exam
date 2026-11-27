import { API, PREFIX_LEN } from '../hash.js'

// Экран «что именно ушло на сервер» — главное в теме.
export default function ServerRequestInfo({ prefix, suffix, total }) {
  const bits = PREFIX_LEN * 4
  return (
    <section className="card">
      <h3>Что именно ушло на сервер</h3>
      <p className="label">Запрос:</p>
      <pre>GET {API}<mark>{prefix}</mark></pre>
      <p className="label">Ваш SHA-1 хеш:</p>
      <pre><mark>{prefix}</mark><span className="local">{suffix}</span></pre>
      <p className="small-text">
        <mark>Выделено</mark> — ушло на сервер. <span className="local">Серое</span> — осталось в браузере, сравнение выполнено локально.
      </p>
      <h4>Почему {PREFIX_LEN} символов недостаточно, чтобы восстановить пароль</h4>
      <ul>
        <li>{PREFIX_LEN} hex-символов = {bits} бит, то есть {(2 ** bits).toLocaleString('ru-RU')} возможных префиксов. Под ваш подходят сотни хешей из базы и бесконечно много паролей.</li>
        <li>SHA-1 необратим: по хешу, а тем более по его началу, пароль не вычислить.</li>
        <li>Сервер не знает, какой из {total} хешей в ответе ваш. В этом суть <b>k-anonymity</b>.</li>
        <li>Если отправить весь хеш целиком, сервер получит точный отпечаток пароля и приватность пропадёт.</li>
      </ul>
    </section>
  )
}
