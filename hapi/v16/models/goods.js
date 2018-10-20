module.exports = (queryInterface, Sequelize) => queryInterface.define(
  'goods',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shop_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    thumb_url: Sequelize.STRING,
    // created_at: Sequelize.DATE, // createdAt
    // updated_at: Sequelize.DATE, // updatedAt
  },
  // {
  //   tableName: 'goods' // 指定表名
  // }
);
