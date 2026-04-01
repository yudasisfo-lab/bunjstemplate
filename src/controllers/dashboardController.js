// src/controllers/dashboardController.js
export const dashboard = async (c) => {
  const html = await Bun.file('./src/views/dashboard.html').text()
  return c.html(html)
}