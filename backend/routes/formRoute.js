const express = require("express");
const router = express.Router();
const Form = require("../model/form");

const detailsControler = require("../controller/formController");

router.post("/form", detailsControler.adddetails);

router.get('/form/:id',detailsControler.getdata);

module.exports = router;
