// Список хешей из ответа сервера; строка с совпадением подсвечена.
export default function HashList({ rows, prefix, matchSuffix, limit = 50 }) {
  return (
    <section className="card">
      <h3>Список хешей из ответа ({rows.length})</h3>
      <p className="small-text">Показаны первые {limit}. Ваш хеш подсвечен, если найден.</p>
      <div className="table">
        {rows.slice(0, limit).map((r) => (
          <div key={r.suffix} className={'tr' + (r.suffix === matchSuffix ? ' hit' : '')}>
            <code><mark>{prefix}</mark>{r.suffix}</code>
            <span>{r.count.toLocaleString('ru-RU')}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
