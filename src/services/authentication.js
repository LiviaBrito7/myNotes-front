export function isUserAuthenticated () {
  return !!(localStorage.getItem('token') || sessionStorage.getItem('token'))
}

export function getUserToken () {
  return localStorage.getItem('token') ?? sessionStorage.getItem('token')
}

export function resetStorage () {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
}
