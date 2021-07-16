const { Router } = require("express");

const ContactController = require("./app/controllers/ContactController");
const CategoryController = require("./app/controllers/CategoryController");

const router = Router();

/**
 * Para passar os middlewares dentro da rotas, fazemos da seguinte forma:
 *
 * router.<method>(<route>,<middleware>,<controller>);
 *
 * Podemos passar a quantidade de middleware que quiser.
 */

// CONTACT CONTROLLER
router.get(
  "/contacts",
  /*
  (request, response, next) => {
    request.appId = "MeuAppID";
    next(); // Para pular pro próximo middleware ou rota.
  },
  */
  ContactController.index
);
router.get("/contacts/:id", ContactController.show);

router.post("/contacts", ContactController.store);

router.put("/contacts/:id", ContactController.update);

router.delete("/contacts/:id", ContactController.delete);

// CATEGORY CONTROLLER
router.get("/categories", CategoryController.index);
router.get("/categories/:id", CategoryController.show);

router.post("/categories", CategoryController.store);

router.put("/categories/:id", CategoryController.update);

router.delete("/categories/:id", CategoryController.delete);

module.exports = router;
