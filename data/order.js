export class orderSummary {
  id;
  total;
  date;
  products;

  constructor(id, total, date, products) {
    this.id = id;
    this.total = total;
    this.date = date;
    this.products = products;
  }
}
export class cartProducts {
  id;
  deliveryId;
  quantity;
  constructor(id, deliveryId, quantity) {
    this.id = id;
    this.deliveryId = deliveryId;
    this.quantity = quantity;
  }
}

export const orders = JSON.parse(localStorage.getItem("orders")) || [];
export let orderId = JSON.parse(localStorage.getItem("orderId")) || 4566628;
export function saveOrderId(orderId) {
  localStorage.setItem("orderId", JSON.stringify(orderId));
}
export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
