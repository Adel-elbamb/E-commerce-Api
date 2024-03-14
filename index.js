import express  from "express"
import bootstrap from './src/bootstrap.js'
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve('./config/.env')})
const app = express()


const port = +process.env.PORT


bootstrap(app,express)


const invoice = {
  shipping: {
    name: "Adel Elbamby",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111,
  },
  items: [
    {
      item: "course ",
      description: "backend node ",
      quantity: 1,
      amount: 40000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
  ],
  subtotal: 6000,
  paid: 0,
  invoice_nr: 1234,
};
createInvoice(invoice, "invoice.pdf");



app.listen(port,()=>{
    console.log(`app running on port ${port}`);
})