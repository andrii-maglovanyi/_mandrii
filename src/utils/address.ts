export const isPotentiallyValidAddress = (address: string): boolean => {
  const trimmed = address.trim();

  const parts = trimmed.split(",").map((p) => p.trim());
  if (parts.length < 2) return false;

  if (trimmed.length < 15) return false;

  const hasNumber = /\d/.test(trimmed);
  if (!hasNumber) return false;

  if (!trimmed.includes(" ")) return false;

  return true;
};
