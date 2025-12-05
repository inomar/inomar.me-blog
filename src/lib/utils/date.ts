import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'yyyy年M月d日', { locale: ja });
}

export function formatDateShort(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'yyyy/MM/dd', { locale: ja });
}

export function formatDateISO(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "yyyy-MM-dd'T'HH:mm:ssxxx");
}
