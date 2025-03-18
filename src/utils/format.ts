export const formattedDateTime = new Intl.DateTimeFormat('pt-br', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

export const formattedDate = new Intl.DateTimeFormat('pt-br', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

export const formattedMoney = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})
