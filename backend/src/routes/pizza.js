import express from "express"
import pizzaController from "../controllers/pizzaController.js"
//Router nos ayuda a colocar los metodos
//que tendar el endpoint, como get, post, put, delete, etc.
const router = express.Router()

router.route("/")
.get(pizzaController.getPizzas)
.post(pizzaController.insertPizza)

router.route("/low-stock")
.post(pizzaController.getLowStock)

router.route("/price-eange")
.post(pizzaController.getPizzasByPriceRange)

router.route("/count")
.post(pizzaController.countPizza)

router.route("/search-name")
.post(pizzaController.searchByName)

router.route("/:id")
.put(pizzaController.updatePizza)
.delete(pizzaController.deletePizza) 
.get(pizzaController.getPizzasById)

export default router
