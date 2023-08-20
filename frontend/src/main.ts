import "./style.css";
import http from "axios";
import { z } from "zod";

/*
const ResponseSchema = z.object({
 id: 0,
  name": "Meatball Marinara",
  "toppings": "Onions, Herbs, Tomato Sauce Drizzle, Tomato Sauce, Mozzarella Cheese, Extra Pork Meatballs",
  "price": 3990,
  "link":"http://localhost:3000/images/marinara.webp"
  });
*/

/* A kapott adat típusa
type Response = z.infer<typeof ResponseSchema>;
*/

let pizzaOneName = document.getElementById("pizzaone")! as HTMLHeadingElement
let pizzaTwoName = document.getElementById("pizzatwo")! as HTMLHeadingElement
let pizzaThreeName = document.getElementById("pizzathree")! as HTMLHeadingElement
let pizzaFourName = document.getElementById("pizzafour")! as HTMLHeadingElement
let pizzaFiveName = document.getElementById("pizzafive")! as HTMLHeadingElement
let pizzaSixName = document.getElementById("pizzasix")! as HTMLHeadingElement
let pizzaSevenName = document.getElementById("pizzaseven")! as HTMLHeadingElement
let pizzaOnePrice = document.getElementById("pizzaoneprice")! as HTMLElement
let pizzaTwoPrice = document.getElementById("pizzatwoprice")! as HTMLElement
let pizzaThreePrice = document.getElementById("pizzathreeprice")! as HTMLElement
let pizzaFourPrice = document.getElementById("pizzafourprice")! as HTMLElement
let pizzaFivePrice = document.getElementById("pizzafiveprice")! as HTMLElement
let pizzaSixPrice = document.getElementById("pizzasixprice")! as HTMLElement
let pizzaSevenPrice = document.getElementById("pizzasevenprice")! as HTMLElement

/*
const ResponseSchema = z.object({
 id: 0,
  name": "Meatball Marinara",
  "toppings": "Onions, Herbs, Tomato Sauce Drizzle, Tomato Sauce, Mozzarella Cheese, Extra Pork Meatballs",
  "price": 3990,
  "link":"http://localhost:3000/images/marinara.webp"
  });
*/

/* A kapott adat típusa
type Response = z.infer<typeof ResponseSchema>;
*/

const serverLoad = async () => {
  const response = await http.get("http://localhost:3000/api/pizzas");
  const result = response.data;
  
  if (!result.success) {
    return console.log(null);
  } else {
    return console.log(result.data);
  }
};

serverLoad()

const customerName = document.getElementById("name")! as HTMLInputElement
const customerZipCode = document.getElementById("zipcode")! as HTMLInputElement
const customerCity = document.getElementById("city")! as HTMLInputElement
const customerStreet = document.getElementById("street")! as HTMLInputElement
const customerHouseNumber = document.getElementById("house")! as HTMLInputElement
const customerEmail = document.getElementById("email")! as HTMLInputElement
const customerPhoneNumber = document.getElementById("phone")! as HTMLInputElement
const pizzaOneCount = document.getElementById("amountone")! as HTMLInputElement
const pizzaTwoCount = document.getElementById("amounttwo")! as HTMLInputElement
const pizzaThreeCount = document.getElementById("amountthree")! as HTMLInputElement
const pizzaFourCount = document.getElementById("amountfour")! as HTMLInputElement
const pizzaFiveCount = document.getElementById("amountfive")! as HTMLInputElement
const pizzaSixCount = document.getElementById("amountsix")! as HTMLInputElement
const pizzaSevenCount = document.getElementById("amountseven")! as HTMLInputElement


type Customer = {
    name: string,
    zipcode: string,
    city: string,
    street: string,
    house: string,
    email: string,
    phone: string
}

type Pizza = {
    pizzaname: string;
    piece: string;
    price: string
};

type Order = {
  customer: {
    customername: string,
    zipcode: string,
    city: string,
    street: string,
    house: string,
    email: string,
    phone: string
  },
  date: string,
  pizza: Pizza[]
  totalprice: number
}

let amountArray: number[] = []
let pizzaOrders: Pizza[] = []
let priceSum = 0
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const today = (`${year}-${month}-${day}`).toString()

document.getElementById("addtoorder")!.addEventListener("click", () => {
  const customerData: Customer = {
    name: customerName.value,
    zipcode: customerZipCode.value,
    city: customerCity.value,
    street: customerStreet.value,
    house: customerHouseNumber.value,
    email: customerEmail.value,
    phone: customerPhoneNumber.value
};

      document.getElementById("outname")!.textContent = customerData.name
      document.getElementById("outaddress")!.textContent = customerData.zipcode + " " + customerData.city + " " + customerData.street + " " + customerData.house
      document.getElementById("outemail")!.textContent = customerData.email
      document.getElementById("outphone")!.textContent = customerData.phone

      const pizzaOrder: Pizza[] = [
          { pizzaname: pizzaOneName.textContent!, piece: pizzaOneCount.value, price: pizzaOnePrice.textContent!},
          { pizzaname: pizzaTwoName.textContent!, piece: pizzaTwoCount.value, price: pizzaTwoPrice.textContent!},
          { pizzaname: pizzaThreeName.textContent!, piece: pizzaThreeCount.value, price: pizzaThreePrice.textContent!},
          { pizzaname: pizzaFourName.textContent!, piece: pizzaFourCount.value, price: pizzaFourPrice.textContent!},
          { pizzaname: pizzaFiveName.textContent!, piece: pizzaFiveCount.value, price: pizzaFivePrice.textContent!},
          { pizzaname: pizzaSixName.textContent!, piece: pizzaSixCount.value, price: pizzaSixPrice.textContent!},
          { pizzaname: pizzaSevenName.textContent!, piece: pizzaSevenCount.value, price: pizzaSevenPrice.textContent!},
      ];

      pizzaOrder.forEach((pizzaData) => {
          const count = parseInt(pizzaData.piece);
          if (count > 0) {
              const multiply = count * parseInt(pizzaData.price)
              const nameElement = document.createElement("h2");
              nameElement.textContent = pizzaData.pizzaname;
              document.getElementById("pizzaordername")!.appendChild(nameElement);
              const pieceElement = document.createElement("h2");
              pieceElement.textContent = pizzaData.piece + " pc"
              document.getElementById("pizzaorderpiece")!.appendChild(pieceElement);
              const priceElement = document.createElement("h2");
              priceElement.textContent = multiply.toString() + " Ft";
              document.getElementById("pizzaorderprice")!.appendChild(priceElement);
              
              let newOrder = {pizzaname: pizzaData.pizzaname, piece: pizzaData.piece, price: pizzaData.price}
              pizzaOrders.push(newOrder)

              amountArray.push(multiply)
          }
      });

      function sumAmountArray(numbers: number[]): number {
          let sum = 0;
          for (const num of numbers) {
            sum += num;
          }
          return sum;
      }

      priceSum = sumAmountArray(amountArray)

      if(priceSum !== 0){
      const totalPriceElement = document.createElement("h2")
      totalPriceElement.textContent = priceSum.toString() + " Ft"
      document.getElementById("totalprice")!.appendChild(totalPriceElement)
      }
      
      const orderCheck = document.getElementById("ordercheck")!
      orderCheck.removeAttribute("style")

      const orderButton = document.getElementById("order")!
      orderButton.removeAttribute("style")
})


document.getElementById("order")!.addEventListener("click", () => {
  async function postJSON(data: any) {
    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  const orderData: Order = { 
    customer: {
      customername: customerName.value,
      zipcode: customerZipCode.value,
      city: customerCity.value,
      street: customerStreet.value,
      house: customerHouseNumber.value,
      email: customerEmail.value,
      phone: customerPhoneNumber.value
    },
    date: today,
    pizza: pizzaOrders,
    totalprice: priceSum,
  };
  
  postJSON(orderData);

})
