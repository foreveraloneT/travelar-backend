module.exports = app => (req, res) => {
  if (!req.path) {
    req.url = `/${req.url}` // prepend '/' to keep query params if any
  }
  return app(req, res)
}
