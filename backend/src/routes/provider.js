import express from "express";
import providerController from "../controllers/providersControllers.js";
import updated from "../utils/CloudianryConfig.js";

const router = express.Router();

router.route("/")
 .get(providerController.getAllProviders)
 .get(updated.single("image"),providerController.insertProviders)

router.route("/:id")
 .put(updated.single("image"),providerController.insertProviders)
 .delete(providerController.deleteProvider);

export default router;