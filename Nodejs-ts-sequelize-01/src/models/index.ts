import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface TodoObject {
    id: number,
    title: string,
    completed:boolean
}

export class Todo extends Model<TodoObject> {
}

Todo.init({
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    timestamps: true,
    sequelize: db,
    tableName: "todos",
})