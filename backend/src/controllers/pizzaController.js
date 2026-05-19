//aqui en el controlador
//vamos a definir las funciones
//que ejecutaran los metodos get, post, put, delete, etc.

//paso 1- Crear un arrey de metodos
const pizzaController = {};

//impoto el schema que voy a utilizar

import pizzaModel from "../models/pizzas.js";

//SELECT
pizzaController.getPizzas = async (req, res) => {
  const pizzas = await pizzaModel.find();
  res.json(pizzas);
};

//INSERT
pizzaController.insertPizza = async (req, res) => {
  //Solicitar los datos que se van a guardar
  const { name, description, price, stock } = req.body;
  //Guardo en el model
  const newPizza = new pizzaModel({
    name,
    description,
    price,
    stock,
  });
  //Guardar en la base de datos
  await newPizza.save();

  res.json({ message: "Pizza insertada correctamente" });
};

//DELETE
pizzaController.deletePizza = async (req, res) => {
  await pizzaModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Pizza eliminada correctamente" });
};

//UPDATE
pizzaController.updatePizza = async (req, res) => {
  //Solicitar los datos que se van a actualizar
  const { name, description, price, stock } = req.body;
  //Actualizar en la base de datos
  await pizzaModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      stock,
    },
    { new: true },
  );
  res.json({ message: "Pizza actualizada correctamente" });
};

pizzaController.getPizzasById = async (req, res) => {
  try {
    const pizza = await pizzaController.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: "pizza bot four" });
    }
    return (res.status(200).json(pizza));
  } catch (error) {
    console.log("error" + error);
    return (res.status(500).json({ message: "internal server error" }));
  }
};

pizzaController.getLowStock = async (req, res) => {
  try {
    const pizza = await pizzaModel.find({ stock: { $lt: 5 } });

    if (!pizza) {
      return res
        .status(404)
        .json({ message: "there are not pizza with low stock" });
    }
    return res.status(300).json(pizza);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

pizzaController.getPizzasByPriceRange = async (req, res) => {
  try {
    const { mix, max } = req.body;
    const pizza = await pizzaModel.find({
      price: { $gte: min, $lte: max },
    });

    if (!pizza) {
      return res.status(404).json({ message: "not pizza with this pric" });
    }

    return res.status(200).json(pizza);
  } catch (error) {
     console.log("error" + error);
    return res.status(500).json({message: "internal sercer error"});
  }
};

pizzaController.countPizza = async (req, res) =>{
    try{
        const count = await pizzaModel.countDocuments();
        return res.status(200).json(count)


    }catch(error){
        console.log("error"+error);
        return res.status(500).json({message: "inernal server error"})
    }
};

pizzaController.searchByName = async (req, res) =>{
    try{
        const {name} = req.body

        const pizza = await pizzaModel.find({
            name: {$regex: name, $options: "1"}
        })
        if(!pizza){
            return res.status(404).json({message: "pizza not found wirth this"})
        }

        return res.status(200).json(pizza)
    }catch(error){
        console.log("error"+error)
        return res.status(500).json({message:""})

    }
}

export default pizzaController;
