const SIGNATURE_KEY = 'bilquis-signature-image';

export function saveSignature(dataUrl: string): void {
  localStorage.setItem(SIGNATURE_KEY, dataUrl);
}

export function getSignature(): string | null {
  return localStorage.getItem(SIGNATURE_KEY);
}

export function deleteSignature(): void {
  localStorage.removeItem(SIGNATURE_KEY);
}
