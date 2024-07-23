export default (sequelize, Sequelize) => {
  const BookSlots = sequelize.define(
    "book_slots",
    {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      room_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "rooms",
          key: "id",
        },
      },
      slot_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "slots",
          key: "id",
        },
      },
      status: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
        defaultValue: 0,
        comment: "0 - Pending, 1 - Confirmed, 2 - Cancelled",
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
      tableName: "book_slots",
    },
  );

  return BookSlots;
};
