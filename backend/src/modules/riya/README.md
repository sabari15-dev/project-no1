# Riya Travel API Integration

This module provides integration with Riya Travel API for flight booking operations.

## Features

- **Token Management**: Automatic login and token storage/reuse across requests
- **4 Main APIs**:
  1. Login - Authentication
  2. Availability - Flight search
  3. Pricing - Get pricing details
  4. Booking - Create flight booking

## API Endpoints

Base URL: `http://localhost:3000/riya` (when running locally)

### 1. Login API
**POST** `/riya/login`

Authenticates with Riya API and stores the token for subsequent requests.

**Request Body**: None required (uses configured credentials)

**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "ZTNsRU8zeGQxU2xMNEVySG9sOERYbk9qWkdZUDlkcnFSQklBRmUy...",
    "message": "Token stored and will be used for subsequent requests"
  }
}
```

**cURL Example**:
```bash
curl -X POST "http://localhost:3000/riya/login" \
  -H "Content-Type: application/json"
```

---

### 2. Availability API
**POST** `/riya/availability`

Search for available flights.

**Request Body**:
```json
{
  "origin": "BOM",
  "destination": "DEL",
  "departureDate": "11 Mar 2026",
  "adultCount": 1,
  "childCount": 0,
  "infantCount": 0,
  "tripType": "O"
}
```

**cURL Example**:
```bash
curl -X POST "http://localhost:3000/riya/availability" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "BOM",
    "destination": "DEL",
    "departureDate": "11 Mar 2026",
    "adultCount": 1,
    "childCount": 0,
    "infantCount": 0,
    "tripType": "O"
  }'
```

---

### 3. Pricing API
**POST** `/riya/pricing`

Get detailed pricing for selected flight.

**Request Body**:
```json
{
  "origin": "BOM",
  "destination": "DEL",
  "tripType": "O",
  "adultCount": 1,
  "childCount": 0,
  "infantCount": 0,
  "trackId": "RA21522642681265035639064237560022488",
  "itineraryInfo": [
    {
      "flightDetails": [
        {
          "flightId": "6540",
          "flightNumber": "6E 2775",
          "origin": "BOM",
          "destination": "DEL",
          "departureDateTime": "11 Mar 2026 01:00",
          "arrivalDateTime": "11 Mar 2026 03:10"
        }
      ],
      "baseAmount": "5694.00",
      "grossAmount": "6802"
    }
  ]
}
```

**cURL Example**:
```bash
curl -X POST "http://localhost:3000/riya/pricing" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "BOM",
    "destination": "DEL",
    "tripType": "O",
    "adultCount": 1,
    "childCount": 0,
    "infantCount": 0,
    "trackId": "RA21522642681265035639064237560022488",
    "itineraryInfo": [
      {
        "flightDetails": [
          {
            "flightId": "6540",
            "flightNumber": "6E 2775",
            "origin": "BOM",
            "destination": "DEL",
            "departureDateTime": "11 Mar 2026 01:00",
            "arrivalDateTime": "11 Mar 2026 03:10"
          }
        ],
        "baseAmount": "5694.00",
        "grossAmount": "6802"
      }
    ]
  }'
```

---

### 4. Booking API
**POST** `/riya/booking`

Create a flight booking.

**Request Body**:
```json
{
  "AdultCount": 1,
  "ChildCount": 0,
  "InfantCount": 0,
  "ItineraryFlightsInfo": [
    {
      "Token": "RABOM0300132010354212",
      "FlighstInfo": [
        {
          "FlightID": "9534",
          "Stock": "6E",
          "FlightNumber": "6E 2775",
          "Origin": "BOM",
          "Destination": "DEL",
          "DepartureTerminal": "2",
          "ArrivalTerminal": "2",
          "DepartureDateTime": "11 Mar 2026 01:00",
          "ArrivalDateTime": "11 Mar 2026 03:10"
        }
      ],
      "PaymentMode": "T",
      "SeatsSSRInfo": [],
      "BaggSSRInfo": [],
      "MealsSSRInfo": [],
      "OtherSSRInfo": [],
      "PaymentInfo": [
        {
          "TotalAmount": "14662"
        }
      ]
    }
  ],
  "PaxDetailsInfo": [
    {
      "PaxRefNumber": "1",
      "Title": "MR",
      "FirstName": "ONE",
      "LastName": "api",
      "DOB": "12/06/1996",
      "Gender": "Male",
      "PaxType": "ADT",
      "PassportNo": "A343555",
      "PassportExpiry": "12/09/2035",
      "PassportIssuedDate": "12/09/2024",
      "PassportCountryCode": "IN",
      "InfantRef": ""
    }
  ],
  "AddressDetails": {
    "CountryCode": "91",
    "ContactNumber": "7639066251",
    "EmailID": "arshidalexander@gmail.com"
  },
  "TripType": "O",
  "BlockPNR": "false",
  "BaseOrigin": "BOM",
  "BaseDestination": "DEL",
  "TrackId": "RA2222122507515832022221468831921GRDQKUEGL2"
}
```

**cURL Example**:
```bash
curl -X POST "http://localhost:3000/riya/booking" \
  -H "Content-Type: application/json" \
  -d '{
    "AdultCount": 1,
    "ChildCount": 0,
    "InfantCount": 0,
    "ItineraryFlightsInfo": [
      {
        "Token": "RABOM0300132010354212",
        "FlighstInfo": [
          {
            "FlightID": "9534",
            "Stock": "6E",
            "FlightNumber": "6E 2775",
            "Origin": "BOM",
            "Destination": "DEL",
            "DepartureTerminal": "2",
            "ArrivalTerminal": "2",
            "DepartureDateTime": "11 Mar 2026 01:00",
            "ArrivalDateTime": "11 Mar 2026 03:10"
          }
        ],
        "PaymentMode": "T",
        "SeatsSSRInfo": [],
        "BaggSSRInfo": [],
        "MealsSSRInfo": [],
        "OtherSSRInfo": [],
        "PaymentInfo": [
          {
            "TotalAmount": "14662"
          }
        ]
      }
    ],
    "PaxDetailsInfo": [
      {
        "PaxRefNumber": "1",
        "Title": "MR",
        "FirstName": "ONE",
        "LastName": "api",
        "DOB": "12/06/1996",
        "Gender": "Male",
        "PaxType": "ADT",
        "PassportNo": "A343555",
        "PassportExpiry": "12/09/2035",
        "PassportIssuedDate": "12/09/2024",
        "PassportCountryCode": "IN",
        "InfantRef": ""
      }
    ],
    "AddressDetails": {
      "CountryCode": "91",
      "ContactNumber": "7639066251",
      "EmailID": "arshidalexander@gmail.com"
    },
    "TripType": "O",
    "BlockPNR": "false",
    "BaseOrigin": "BOM",
    "BaseDestination": "DEL",
    "TrackId": "RA2222122507515832022221468831921GRDQKUEGL2"
  }'
```

---

### 5. Token Status (Utility)
**GET** `/riya/token-status`

Check if a token is currently stored.

**cURL Example**:
```bash
curl -X GET "http://localhost:3000/riya/token-status"
```

## How to Use

### 1. Start the Server
```bash
cd backend
npm run dev
```

### 2. Test the Flow

1. **Login first** (optional - will auto-login if needed):
   ```bash
   curl -X POST "http://localhost:3000/riya/login" -H "Content-Type: application/json"
   ```

2. **Search for flights**:
   ```bash
   curl -X POST "http://localhost:3000/riya/availability" \
     -H "Content-Type: application/json" \
     -d '{"origin":"BOM","destination":"DEL","departureDate":"11 Mar 2026","adultCount":1}'
   ```

3. **Get pricing** (use trackId from availability response):
   ```bash
   curl -X POST "http://localhost:3000/riya/pricing" \
     -H "Content-Type: application/json" \
     -d '{ ... pricing data ... }'
   ```

4. **Create booking**:
   ```bash
   curl -X POST "http://localhost:3000/riya/booking" \
     -H "Content-Type: application/json" \
     -d '{ ... booking data ... }'
   ```

## Token Management

- The service automatically logs in and stores the token when needed
- Token is reused across all subsequent API calls
- No need to manually pass the token in requests
- Token persists for the lifetime of the server process

## Configuration

Agent credentials are configured in `riya.service.ts`:
- AgentId: `RABOM0300132`
- TerminalId: `RABOM030013201`
- UserName: `orange01`
- Base URL: `http://testrws.mywebcheck.in/travelapi.svc`

## File Structure

```
src/modules/riya/
├── riya.interface.ts   # TypeScript interfaces for all APIs
├── riya.service.ts     # Service layer with token management
├── riya.controller.ts  # Request handlers
└── riya.routes.ts      # Route definitions
```
