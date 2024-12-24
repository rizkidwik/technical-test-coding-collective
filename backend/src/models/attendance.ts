import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database"
import User from "./user";
class Attendance extends Model {
    public id!: number
    public user_id!: number
    public latitude!: string
    public longitude!: string
    public ip!: string;
    public photo!: string;
    public timestamp!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Attendance.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING
    },
    timestamp: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName: 'attendance',
    timestamps: true
})
export default Attendance