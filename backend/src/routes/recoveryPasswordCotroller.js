import express from "express";
import recoveryPasswordController from "../controllers/recoberyPassword.js";

const router = express.Router();

router.route("/requesCode").post(recoveryPasswordController.requestCode);
router.route("/verifyCode").post(recoveryPasswordController.verificar);
router.route("/newPaaword").post(recoveryPasswordController.newPassword);

export default router;
