import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database"
import User from "./user";
class Attendance extends Model {
    public id!: number
    public user_id!: number
    public clock_in!: string;
    public clock_in_location!: string;
    public clock_in_ip!: string;
    public clock_in_photo!: string;
    public clock_out!: string;
    public clock_out_location!: string;
    public clock_out_ip!: string;
    public clock_out_photo!: string;
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
    clock_in: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clock_in_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clock_in_ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clock_in_photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clock_out: {
        type: DataTypes.STRING
    },
    clock_out_location: {
        type: DataTypes.STRING
    },
    clock_out_ip: {
        type: DataTypes.STRING
    },
    clock_out_photo: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName: 'attendance',
    timestamps: true
})

export default Attendance