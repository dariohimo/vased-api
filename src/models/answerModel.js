import { DataTypes } from 'sequelize';

import { sequelize } from '../database/database.js';

export const Answer = sequelize.define('answer', {
   id:{ 
       type: DataTypes.INTEGER, 
       primaryKey: true,
       autoIncrement: true
   },
   answer_text: {
    type: DataTypes.STRING, 
   }
  
});
  
