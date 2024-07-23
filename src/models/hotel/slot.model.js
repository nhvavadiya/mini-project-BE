export default (sequelize, Sequelize) => {
  const Slots = sequelize.define(
    "slots",
    {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      room_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "rooms",
          key: "id",
        },
      },
      start_time: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
      },
      end_time: {
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
      tableName: "slots",
    },
  );

  return Slots;
};
