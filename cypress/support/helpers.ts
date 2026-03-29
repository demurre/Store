export function generateRandomNumber(range: number): number {
  return Math.floor(Math.random() * range);
}

export function generateRandomString(length: number): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const alphabet = upper + lower + digits;

  const chars: string[] = [
    upper[generateRandomNumber(upper.length)],
    lower[generateRandomNumber(lower.length)],
    digits[generateRandomNumber(digits.length)],
  ];

  for (let i = 3; i < length; i++) {
    chars.push(alphabet[generateRandomNumber(alphabet.length)]);
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const j = generateRandomNumber(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

export function generateNumberWithLength(length: number): number {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length);
  return generateRandomNumber(max - min) + min;
}

export function generateRandomEmail(
  domain = "example.com",
  localLength = 8,
): string {
  return `user_${generateRandomString(localLength)}@${domain}`;
}

export function generateRandomPassword(length = 10): string {
  if (length < 8) throw new Error("Password length must be at least 8");
  return generateRandomString(length);
}
