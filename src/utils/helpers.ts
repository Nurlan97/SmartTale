export function setCookie(name: string, value: string, days: number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
export function getCookie(name: string) {
  try {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  } catch (e) {
    return null;
  }
}
export function removeCookie(name: string) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

export function cutText(text: string, limit: number) {
  text = text.trim();
  if (text.length <= limit) return text;
  text = text.slice(0, limit);
  const lastSpace = text.lastIndexOf(' ');
  if (lastSpace > 0) {
    text = text.substring(0, lastSpace);
  }
  return text + '...';
}

export function fullPromise<T>(
  promise: Promise<T>,
  fulfilled: (value: T) => void,
  rejected: (error: T) => void,
): void {
  promise
    .then((value) => {
      fulfilled(value);
    })
    .catch((error) => {
      rejected(error);
    });
}
