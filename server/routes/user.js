const express = require("express");
const {
  SignUp,
  login,
  refreshAccessToken,
} = require("../controllers/authControllers");
const { payment, handleWebHookEvent, getOrderBySessionId } = require("../controllers/paymentController");
const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", login);
router.get("/refresh-token", refreshAccessToken);

router.post("/payment", payment);
router.get("/order/:sessionId", getOrderBySessionId);

router.post("/webhook", express.raw({ type: "application/json" }), handleWebHookEvent);

module.exports = router;