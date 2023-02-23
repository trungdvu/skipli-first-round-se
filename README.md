# SKIPLI FIRST ROUND SE

## Local demo
https://user-images.githubusercontent.com/96437142/216833433-4dfcb943-a533-4e67-ae54-c9c7e7b9b2a6.mp4


## Get started

1. Require Node v18
2. Run backend
- Go to the bacnend folder
```bash
  cd backend
```
- Create `.env` with folloing variables at root. Needed to hide these twilio variables, otherwise they will detech and reset the value.
```js
PORT=8080
NODE_ENV=development
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_MESSAGING_SERVICE_SID=
```
- Install dependencies and run the app
```bash
  yarn install
  yarn build
  yarn dev
```
3. Run the frontend
- Go to the frontend folder
- Install dependencies and run the app
```bash
  yarn install
  yarn start
```

## Tech stack
- React, TailwindCSS
- Node.js, Firebase


## Screenshots
### Verify Code
<img width="320" alt="Screenshot 2023-02-05 at 11 38 44 PM" src="https://user-images.githubusercontent.com/96437142/216832273-cd1de22a-e813-4b77-87b9-dccb3aa8fe98.png">

### Auth
<img width="1792" alt="Screenshot 2023-02-05 at 11 38 44 PM" src="https://user-images.githubusercontent.com/96437142/216832157-0aaf0512-6ad3-4c34-bb85-8a247aa53b5d.png">

### Home
<img width="1792" alt="Screenshot 2023-02-05 at 11 46 12 PM" src="https://user-images.githubusercontent.com/96437142/216832511-10587eb7-53c8-4769-8d3e-4f4a6ea8c5c5.png">

### Profile
