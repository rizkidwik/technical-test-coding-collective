import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database"
class User extends Model {
    public id!: number
    public name!: string
    public email!: string
    public password!: string
    public createdAt!: Date;
    public updatedAt!: Date;
}

User.init({
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roles: {
        type: DataTypes.ENUM('ADMIN', 'USER')
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps:true
})
export default User