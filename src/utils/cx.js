export function cx(...inputs) {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .map((input) => {
      if (typeof input === 'string' || typeof input === 'number') return input;
      if (typeof input === 'object') {
        return Object.entries(input)
          .filter(([, enabled]) => enabled)
          .map(([key]) => key);
      }
      return '';
    })
    .flat()
    .filter(Boolean)
    .join(' ');
}
