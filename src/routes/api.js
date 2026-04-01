// src/routes/api.js
import { Hono } from 'hono'

const api = new Hono()

api.get('/stats', (c) => {
  return c.json({ users: 10, orders: 50, revenue: 999 })
})

export default api