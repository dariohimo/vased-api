import { User } from "../models/userModel.js";


export const createUser = async (req, res) => {
    try {
        const { names, lastNames, dni, email, birthDate, city, country } = req.body;

        const newUser = await User.create({
            names, lastNames, dni, email, birthDate, city, country, password:123
        });
        res.json(newUser);
} catch  (error) {
    return res.status(500).json({ message: error.message  });
}
};

/*UPDATE USER */

export const updateUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            names,
            lastNames,
            dni,
            email,
            birthDate,
            city,
            country,
            
        } =
        req.body;


        const user = await User.findByPk(id)

        user.names = names
        user.lastNames = lastNames
        user.dni = dni
        user.email = email
        user.birthDate = birthDate
        user.city = city
        user.country = country
        user.password = user.password
        await user.save()

        res.json(user)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}

/* DELETE USER */

export const deleteUser = async (req, res) => {
    
    try {
        const {
            id
        } = req.params
        await User.destroy({
            where: {
                id,
            }
        });
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};



