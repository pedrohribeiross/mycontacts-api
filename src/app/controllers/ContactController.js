const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  // Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);

    // Agora se eu quiser passar ou tratar o request.appId no routes, eu faço o controller por aqui.

    // response.send(request.appId);
  }

  // Obter UM registro
  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "User not found" });
    }

    response.json(contact);
  }

  // Criar novo registro
  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response
        .status(400)
        .json({ error: "This e-mail is already in use" });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    // Conferindo se encontrou o User
    if (!contactExists) {
      return response.status(404).json({ error: "User not found" });
    }

    // Conferindo se o campo Name está preenchido
    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    // Conferindo se encontrou o email e se o email ta ligado com o id do user.
    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: "This e-mail is already in use" });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    await ContactsRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
