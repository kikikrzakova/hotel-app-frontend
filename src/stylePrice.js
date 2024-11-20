export default function stylePrice(price) {
  const styledPrice = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return styledPrice;
}
