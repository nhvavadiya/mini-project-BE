export default (sequelize, Sequelize) => {
  const Hotels = sequelize.define(
    "hotels",
    {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      admin_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "admins",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      phone_no: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
      },
      active: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        field: "created_at",
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "hotels",
    },
  );

  return Hotels;
};
