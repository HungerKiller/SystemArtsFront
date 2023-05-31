import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { ApiRoute } from '../api-routes';
import { Order } from '../models/Order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    get token(): any {
        return localStorage.getItem('token');
    }

    constructor(private http: HttpClient) { }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(ApiRoute.ORDER.getOrders(), { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
    }

    getOrder(orderId: number): Observable<Order> {
        return this.http.get<Order>(ApiRoute.ORDER.getOrder(orderId), { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
    }

    getOrdersByUserId(userId: number): Observable<Order[]> {
        return this.http.get<Order[]>(ApiRoute.ORDER.getOrdersByUserId(userId), { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
    }

    postOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(ApiRoute.ORDER.postOrder(), order, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
    }

    putOrder(orderId: number, order: Order): Observable<Order> {
        return this.http.put<Order>(ApiRoute.ORDER.putOrder(orderId), order, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
    }

    deleteOrder(orderId: number): Observable<Order> {
        return this.http.delete<Order>(ApiRoute.ORDER.deleteOrder(orderId), { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
    }
}
