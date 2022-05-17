import { DataTypes } from 'sequelize';

import { sequelize } from '../database/database.js';

import {User} from "./userModel.js";
import  {Classroom}  from "./classroomModel.js";

export const Teacher_classroom = sequelize.define('teacher_classroom', {
   id:{ 
       type: DataTypes.INTEGER, 
       primaryKey: true,
       autoIncrement: true
   }
   
});

User.belongsToMany(Classroom, {through: 'teacher_classroom'});
Classroom.belongsToMany(User, {through: 'teacher_classroom'});