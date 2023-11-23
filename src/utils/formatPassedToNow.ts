import { formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

export function formatPassedToNow(date: Date | string) {

  if (typeof date === "string") {
    date = new Date(date)
  }

  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBr
  })

}