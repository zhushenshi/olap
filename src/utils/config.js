
const _config = {
  development: {
    baseURL: '',
    BASE_FILE_URL: ''
  },
  test: '',
  production: {
    baseURL: '',
    BASE_FILE_URL: ''
  }
}
const baseURL = _config[process.env.NODE_ENV].baseURL

export { baseURL }
