import express from "express";
import mobileController from "../controller/mobile.controller.js";
import { Mobile } from "../model/Mobile.model.js";
const route = express.Router();

// const movies1 = await Movies.create({
//     name: "Ratatouille",
//     poster:
//       "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
//     rating: 8,
//     summary:
//       "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
//     trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
//   });
const mobile1 = await Mobile.create({
  brand: "Samsung",
  title: "Samsung Galaxy S4",
  url: "https://www.amazon.com/dp/B0CMDMKQB7?ref_=cm_sw_r_cp_ud_dp_TYW4FD3CAE03JWA4F0ZG&th=1",
  rating: 3.7,
  image:
    "https://www.91-cdn.com/hub/wp-content/uploads/2023/12/Samsung-Galaxy-S24-Ultra.png",
  os: "Android v14",
  ram: 12,
  price: 129999,
});

route
  .route("/")
  .get(mobileController.getAllMobileData)
  .post(mobileController.postDataByID);

route
  .route("/:id")
  .get(mobileController.getMobileDataByID)
  .put(mobileController.putMobileDataByID)
  .delete(mobileController.deleteMobileDataByID);

export default route;
