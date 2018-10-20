module.exports = (queryInterface, Sequelize) => queryInterface.define(
  'shops',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
  //   tableName: 'shops' // 指定表名
  // }
);