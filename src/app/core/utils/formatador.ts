export const dateFormatter = new Intl.DateTimeFormat("pt-BR");

export const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function timeFormatter(date: string) {
  return `${date.substring(0, 5)}`;
}
