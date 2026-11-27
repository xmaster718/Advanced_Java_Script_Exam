// SHA-1 считается в браузере. crypto.subtle работает только на https или localhost.
export async function sha1Hex(text) {
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}

export const API = 'https://api.pwnedpasswords.com/range/'
export const PREFIX_LEN = 5

// "ОСТАТОК:ЧИСЛО" -> [{ suffix, count }]
export function parseRange(text) {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [suffix, count] = l.split(':')
      return { suffix, count: parseInt(count, 10) || 0 }
    })
}
