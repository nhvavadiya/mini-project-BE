export default (sequelize, Sequelize) => {
  const Rooms = sequelize.define(
    "rooms",
    {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      hotel_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "hotels",
          key: "id",
        },
      },
      room_no: {
        type: Sequelize.INTEGER(10),
        allowNull: true,
      },
      bed_count: {
        type: Sequelize.INTEGER(10),
        allowNull: true,
      },
      is_ac_room: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
        defaultValue: 0,
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
      tableName: "rooms",
    },
  );

  return Rooms;
};
