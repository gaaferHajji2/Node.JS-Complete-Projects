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
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
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