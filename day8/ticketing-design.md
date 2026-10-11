# TicketHub Design Document

## 1. Requirements
**Functional**
- Users can browse events and available seats.
- Users can hold seats temporarily before purchase.
- Users can pay securely and receive tickets.
- Users can view their purchased tickets.

**Non-functional**
- Speed: must handle thousands of concurrent requests.
- Correctness: no double-booking of seats.
- Fairness: seat holds expire quickly to prevent hoarding.
- Reliability: system must survive traffic spikes.

## 2. Estimates
- Registered users: 2 million
- Normal day: 50,000 visitors × 10 pages = 500,000 page views/day  
  → ~6 page views/sec average  
- Normal sales: 5,000 tickets/day → ~0.06 tickets/sec
- Big sale: 200,000 visitors in 10 minutes, 20,000 seats sold  
  → 200,000 ÷ 600 sec ≈ 333 requests/sec browsing  
  → 20,000 ÷ 600 sec ≈ 33 purchases/sec

Comparison: normal traffic is modest; big sale traffic is ~500× higher.

## 3. API Endpoints
- **GET /events** → list upcoming events
- **GET /events/{id}/seats** → view available seats
- **POST /seats/{id}/hold** → hold a seat for a short time
- **POST /orders** → pay and confirm purchase
- **GET /users/{id}/tickets** → view purchased tickets

## 4. Data Model
- **users** (user_id PK, name, email UNIQUE, password_hash)
- **events** (event_id PK, title, date, venue)
- **seats** (seat_id PK, event_id FK, section, row, number, status)
- **orders** (order_id PK, user_id FK, event_id FK, seat_id FK, payment_status)

**Relationships**
- One user → many orders
- One event → many seats
- Many-to-many between users and seats via orders

**Preventing double-booking**
- `seats.status` updated inside a transaction when an order is confirmed.
- `UNIQUE(seat_id)` constraint in orders ensures one seat per order.
- Seat holds expire automatically; only confirmed orders lock seats.

## 5. Architecture Diagram
[ Users ]
|
[ CDN + Load Balancer ]
|
[ App Servers ] --- [ Cache ]
|
[ Database (Primary + Read Replica) ]
|
[ Payment Gateway ]   [ Object Storage (tickets/receipts) ]
|
[ Queue ] ---> [ Worker: seat hold expiry, email tickets ]


**Components**
- **CDN + Load Balancer:** distribute traffic and serve static assets quickly.
- **App Servers:** handle API requests and enforce business logic.
- **Cache:** store seat maps and event listings for fast reads.
- **Database:** transactional seat booking; replica handles browsing queries.
- **Payment Gateway:** secure external payment processing.
- **Object Storage:** store ticket PDFs and receipts.
- **Queue + Worker:** manage background tasks like expiring holds and sending emails.

## 6. Trade-offs
1. **Strong consistency vs performance:** strict transactions prevent double-booking but may slow peak sales.  
2. **Caching vs freshness:** caching seat maps improves speed but risks showing stale availability; must balance with frequent invalidation.
