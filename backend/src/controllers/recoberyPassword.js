import JsonWebToken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

import HTMLRecoveryEmial from "../utils/sendMailRecovery.js";

import { config } from "../../config.js";

import customerModel from "../models/customers.js";
import { json } from "stream/consumers";
import { Network } from "inspector/promises";

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
  try {
    //1 solicitamso los datos
    const { email } = req.body;

    //validar que el correo si exista en la bad
    const userFound = await customerModel.findOne({ email });

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    //Generamos un codigo aleatorio

    const randomCode = crypto.randomBytes(3).toString("hex");

    //guardamos todo en un token
    const token = JsonWebToken.sign(
      //#1- ¿que vamos a guardar?
      { email, randomCode, userType: "customer", verificar: false },
      //#2- Secret key
      config.JWT.secret,
      //#3- cuanto expira
      { expiresIn: "15m" },
    );

    res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 });

    //Enviar el codigo por correo electronico
    //#1- quien lo envia
    const transporter = nodemailer.createTransport({
      service: "email",
      auth: {
        user: config.email.user_email,
        pass: config.email,
        user_passworf,
      },
    });

    //#2- quien lo recibe y como lo recibe
    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subjecy: "Recuperacion de contraseña",
      body: "El codigo vence en 15 minutos",
      html: HTMLRecoveryEmial(randomCode),
    };

    //#3- envidar correo electronico
    (transporter.sendMail(mailOptions),
      (error, info) => {
        if (error) {
          console.log("error" + error);
          return res.status(500).json({ message: "Error sending mail" });
        }
        return res.status(200).json({ message: "email sent" });
      });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Intrnal serner error" });
  }
};

recoveryPasswordController.verificar = async (req, res) => {
  try {
    //#1 solicitamos los datos
    const { code } = req.body;

    //Obtenemos la informacion que esta dentro del token
    //Accedemos a la cooken
    const token = req.cookies.recoveryCookie;
    const decoded = JsonWebToken.verify(token, config.JWT.secret);

    //Ahora, comparar el codigo que el usurioa escribio
    //con el que esta guardado en el token

    if (code !== decoded.randomCode) {
      return res.status(400).json({ message: "Invalidad code" });
    }

    //En cambio, si lo escribw bien el codigo
    //vamos a colocar en el token ya esta verificado

    const newRoken = JsonWebToken.sign(
      //#1 que vamos a guardar
      { email: decoded.email, userType: "customer", verified: true },
      //#2 Secret key
      config.JWT.secret,
      //#3 cuando expira
      { expiresIn: "15m" },
    );

    res.cookie("recoveryCookie", Network, { maxAge: 15 * 60 * 100 });

    return res.status(200).json({ message: "Code verificar successfully" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

recoveryPasswordController.newPassword = async (req, res) => {
  try {
    const { newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Password doesnt match" });
    }

    //vamos a comprobar que la constante verified que estad en el token
    //ya este en true (0 sea que hay pasado por el pasp 2)
    const token = req.cookie.recoveryCookie;
    const decoded = JsonWebToken.verify(token, config.JWT.secret);

    if (!decoded.verificar) {
      return res.status(400).json({ message: "Code not verified" });
    }
    //encriptar la contraseña
    const passwordHash = await bcrypt.hash(newPassword, 10);

    //Actualizar la contraseña en la base da datos
    await customerModel.findByIdAndUpdate(
      { email: decoded.emial },
      { password: passwordHash },
      { new: true },
    );

    res.clearCookie("recoveryCookie");

    return res.status(200).json({ message: "Password upated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ messahe: "Internal server error" });
  }
};

export default recoveryPasswordController;
