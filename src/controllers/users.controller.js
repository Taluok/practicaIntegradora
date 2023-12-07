import * as userService from "../services/user.services.js";

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.getByIdUser(id);
        if (!user) throw new Error("Usuario no encontrado!");

        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const getByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await userService.getByEmailUser(email);
        if (!user) throw new Error("Usuario no encontrado!!");
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const response = await userService.getAllUsers(page, limit);
        res.json(response);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const userData = { ...req.body };
        const newUser = await userService.createUser(userData);
        if (!newUser) throw new Error("Validation Error!");
        else
            res.json({
                data: newUser,
            });
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;

        let user = await userService.getByIdUser(id);

        if (!user) throw new Error("Usuario no encontrado");

        const userUpdated = await userService.updateUser(id, {
            name,
            description,
            price,
            stock,
        });

        res.json({
            msg: "User updated",
            data: userUpdated,
        });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        await userService.deleteUser(id);

        res.json({
            msg: "Usuario eliminado",
        });
    } catch (error) {
        next(error);
    }
};
