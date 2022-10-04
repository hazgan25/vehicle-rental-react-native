# Vehicle Rental Mobile (React Native) <img src='./src/assets/img/vehicleRentalIcon.png' height='50' align='center' />

<div style="text-align:center;position:relative; bottom:43px" align="center">
<img src='./src/assets/gif/vehicleRentalLoading.gif' width='auto' />

[![react-native](https://img.shields.io/npm/v/react-native?label=react-native)](https://reactnative.dev/)
[![async-storage](https://img.shields.io/npm/v/async-storage?label=async-storage)](https://www.npmjs.com/package/@react-native-async-storage/async-storage)
[![axios](https://img.shields.io/npm/v/axios?label=axios)](https://www.npmjs.com/package/@react-native-async-storage/async-storage)
[![Redux](https://img.shields.io/npm/v/redux?label=redux)](https://www.npmjs.com/package/redux)
[![react-redux](https://img.shields.io/badge/react--redux-7.2.6-orange)](https://www.npmjs.com/package/react-redux)
[![Redux-promise-middleware](https://img.shields.io/npm/v/redux-promise-middleware?label=redux-promise-middleware)](https://www.npmjs.com/package/redux-promise-middleware)
[![react-native-image-picker](https://img.shields.io/npm/v/react-native-image-picker?label=react-native-image-picker)](https://www.npmjs.com/package/react-native-image-picker)

Vehicle Rental Mobile Apps is a service for renting a vehicle, using React Native framework

</div>

# Features

## There are several features of this API and End Point, as below :

### Public

<ul>
<li>Register</li>
<li>Login</li>
<li>Forgot Password</li>
<li>List Vehicle along with search, filter, sort and pagination features</li>
<li>Vehicle Detail</li>
<li>Reservation (but can't make a reservation with the vehicle you rent)</li>
<li>Reservation history</li>
</ul>

### Tenant

<ul>
<li>Add Vehicle</li>
<li>Edit Vehicle</li>
<li>Delete Vehicle</li>
</ul>

# How to Run the Application

## 1 Clone Repository

```
git clone <this repo url>
```

## 2 Install dependencies Package
```
npm install
```

OR

```
npm i
```

## 3 Installing dependencies

You will need Node, the React Native command line interface, a JDK, and Android Studio.

While you can use any editor of your choice to develop your app, you will need to install Android Studio in order to set up the necessary tooling to build your React Native app for Android.

click for tutorials : [cick here!](https://reactnative.dev/docs/environment-setup)

noted : i'm using JDK 11

## 4 Setups Project

<li>Setups Environment File</li>
<p>
Create file name .env on the folder project
Create an .env file name in the project folder, then fill in the variables like this :
</p>

<table>
<tr>
<td>HOST</td>
<td>Your host backend</td>
</tr>
</table>

note : how to find out your host, go to cmd then type ipconfig. copy paste the IPv4 Address. example : 10.236.239.129:8000. you can also use a virtual host if you use VirtualBox

## 4 Run Project

Run the app in development mode after the server/backend is running. with two terminals with the command as below:

<li>first terminal</li>

```
npm start
```

<li>second terminal</li>
for android emulator

```
npm run android
```
for ios emulator
```
npm run ios
```

Later the emulator will open itself if you have set dependencies

# Deployment

### `example of this project` <https://bit.ly/3C9Golk>

# Related Projects

### `Vehicle Rental - Backend` <https://github.com/Hazgn/vehicle-rental-express>

### `Vehicle Rental - Frontend` <https://github.com/Hazgn/vehicle-rental-react>