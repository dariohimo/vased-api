import { DataTypes } from 'sequelize';

import { sequelize } from '../database/database.js';

export const Teacher_classroom = sequelize.define('teacher_classroom', {
   id:{ 
       type: DataTypes.INTEGER, 
       primaryKey: true,
       autoIncrement: true
   },
   createdAT: {
    type: DataTypes.DATE, 
   },
   updatedAT: {
    type: DataTypes.DATE, 
   }
});