export function formatValidationError(issues: any) {
  return issues.map((err: any) => err.message);
}
