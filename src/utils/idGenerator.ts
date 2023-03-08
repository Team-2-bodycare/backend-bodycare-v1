// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateId(nome: string): string {
  const letrasSortidas = nome
    .toLowerCase()
    .replace(/\s/g, '')
    .split('')
    .sort()
    .join('')
    .slice(0, 2);
  const agora = new Date();
  const hora = agora.getHours().toString().padStart(2, '0');
  const minuto = agora.getMinutes().toString().padStart(2, '0');
  const segundo = agora.getSeconds().toString().padStart(2, '0');
  const id = `bc${hora}${minuto}${segundo}${letrasSortidas}`;
  return id;
}
