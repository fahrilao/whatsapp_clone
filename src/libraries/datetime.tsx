export const convertEpoch = (t: number): string => {
  const dt = new Date(t);
  const hr = dt.getUTCHours();
  const m = dt.getUTCMinutes();
  
  return hr + ':' + m
}