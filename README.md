# Bootcamp Final Project - Full Stack Jewelry Shop

`final_jewelry_shop` is a full-stack application that allows you to create an account in the store, log in, browse products, basket contents and orders, add to the basket and create an order.

The project was implemented during the **Kodilla Bootcamp Full Stack Developer** course.
No design guidelines or .psd template were provided with the page.

## Installation

Clone the repository from github. You can use ssh:
```
git clone git@github.com:jerzy-jarczynski/final_jewelry_shop.git
```

Open a terminal in the project directory and go to the client directory to install React packages. You can use yarn:
```
cd client
```
```
yarn install
```
```
yarn build
```

Return to the root of the project and install the packages for the server:
```
cd ..
```
```
npm install
```

Run the server:
```
npm run start
```

the application will be available at:
```
http://localhost:8000/
```

> Note: if you want the application to be fully functional on your local machine, you need to install and configure MySQL.
Remember to properly edit the `.env` file containing database access data. Adding products is done using Postman. It is not possible to add products from the client level.

## Used technologies

`HTML`, `CSS`, `JavaScript`, `NestJS`, `React`, `MySQL`, `Prisma`

> Note: The appearance of the website is fully based on ready-made Bootstrap components. The layout was not provided for the project, so I focused on full functionality, leaving the issue of nice appearance until after the project was completed.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Demo

You can see living demo without cloning or downloading the repo:

https://nestjs-react-jewelry-shop.onrender.com/

## Issues

The application is not fully developed in terms of UX. I focused on implementing the design guidelines and requirements, leaving these issues to be refined later. I have not introduced any data sorting mechanism in the basket and orders. The website may not encourage you to make purchases by having modals that pop up at every step asking you to confirm your action. This is an academic application and will not be used for commercial purposes.