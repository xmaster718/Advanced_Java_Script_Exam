// Итог проверки: найден или нет, и статистика по ответу.
export default function ResultCard({ match, total }) {
  return (
    <section className={'card ' + (match ? 'bad' : 'ok')}>
      <h2>{match ? '⚠️ Пароль найден в утечках' : '✅ В утечках не найден'}</h2>
      <p>
        {match ? (
          <>Встречался <b>{match.count.toLocaleString('ru-RU')}</b> раз(а). Смените его везде, где использовали.</>
        ) : (
          <>Совпадения нет. Это не гарантия надёжности — важны длина и уникальность пароля.</>
        )}
      </p>
      <ul className="stats">
        <li>Хешей пришло в ответе: <b>{total}</b></li>
        <li>Среди скольких «соседей» вы спрятались: <b>{Math.max(total - (match ? 1 : 0), 0)}</b></li>
        <li>Совпадений с вашим хешем: <b>{match ? 1 : 0}</b></li>
      </ul>
    </section>
  )
}
