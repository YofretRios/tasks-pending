export function setCookie(name, value, days) {
  if (typeof window !== 'undefined') {
    let expires = '';

    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toGMTString()}`;
    }

    document.cookie = `${name}=${value}${expires}; path=/`;
  }
}

export function readCookie(name) {
  if (typeof window !== 'undefined') {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);

      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }

    return null;
  }

  return null;
}
