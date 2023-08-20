import express from "express"
import fs from "fs/promises"
import type { Request, Response } from "express"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static('data'))

const port = 3000

app.get('/api/pizzas', async (req: Request, res: Response) => {
  const pizzasData = await fs.readFile("./data/pizzascript.json", "utf-8")
  res.send(JSON.parse(pizzasData)) 
})

app.post('/api/orders', async (req: Request, res: Response) => {
  const {customer, customername, zipcode, city, street, house, email, phone, date, pizza, pizzaname, piece, price, totalprice} = req.body

  let newOrder = []
  newOrder.push({customer, customername, zipcode, city, street, house, email, phone, pizza, date, pizzaname, piece, price, totalprice})
  await fs.writeFile(`./orders/order_${customername}_${date}.json`, JSON.stringify(newOrder), "utf-8")

  res.status(200).json("OK") 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})