package ee.tormi.veebipood.controller;

import ee.tormi.veebipood.entity.Order;
import ee.tormi.veebipood.entity.Product;
import ee.tormi.veebipood.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5137")
@RestController
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @GetMapping("orders")
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }
    // TODO: Ei tagastataks kõiki tellimusi
    // TODO: Pean võtma front-endist AINULT ID ja mitte usaldama front-endist tulevad toote hinda
    @PostMapping("orders")
    public List<Order> addOrder(@RequestBody Order order) {
        order.setCreated(new Date(System.currentTimeMillis()));
        double sum = 0;
        for (Product p: order.getProducts()) {
            sum = sum + p.getPrice();
            // sum += p.getPrice();
        }
//        for (int i = 0; i < order.getProducts().size(); i++) {
//            Product p = order.getProducts().get(i);
//            sum = sum + p.getPrice();
////             sum += p.getPrice();
//        }
        order.setTotalSum(sum);
        orderRepository.save(order);
        return orderRepository.findAll();
    }
}