export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

export const redirect = (res, destination) => {
  res.writeHead(307, { Location: destination });
  res.end();
};
