export const encodeBase64 = (string: string): string => {
  return Buffer.from(string).toString('base64');
};

export const decodeBase64 = (base64: string): string => {
  return Buffer.from(base64, 'base64').toString();
};
