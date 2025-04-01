import { useEffect, useState } from "react";
import { Order } from "../models/Order";

function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetch("http>//localhost>8080/orders")
        .then(res => res.json())
        .then(json => console.log(json))
    }, []);

  return (
    <div>
        {orders.map(order =>
            <div key={order.id}>
                <div>{order.id}</div>
                <div>{order.created?.toString()}</div>
                <div>{order.person?.email}</div>
                <div>{order.totalSum}€</div>
                <div>
                    {order.products?.map(product => 
                    <div>{product.name}</div>
                    <div>{product.price}€</div>
                )}
                </div>
                <div></div>
            </div>
        )}
    </div>
  )
}

export default Orders