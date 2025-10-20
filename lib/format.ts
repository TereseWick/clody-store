export function nok(n: number) {
  return new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(n / 100);
}
