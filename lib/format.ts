export function formatMileage(value: number): string {
  return new Intl.NumberFormat('en-US').format(value).replace(/,/g, ' ');
}

export function getCityCountry(address: string): string {
  const parts = address.split(',').map(part => part.trim());
  return parts.length >= 2 ? `${parts[1]}, ${parts[2] ?? ''}`.trim().replace(/,$/, '') : address;
}

export function getAddressParts(address: string): { city: string; country: string } {
  const parts = address.split(',').map(part => part.trim());
  return {
    city: parts[1] ?? '',
    country: parts[2] ?? ''
  };
}

export function normalizePrice(price: string): string {
  return price.replace('$', '');
}
