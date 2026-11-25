export function responsiveSrcSet(url, widths = [640, 960, 1400]) {
  if (!url) return undefined;

  return widths
    .map((width) => {
      const resized = /([?&]w=)\d+/.test(url)
        ? url.replace(/([?&]w=)\d+/, `$1${width}`)
        : `${url}${url.includes('?') ? '&' : '?'}w=${width}`;
      return `${resized} ${width}w`;
    })
    .join(', ');
}
