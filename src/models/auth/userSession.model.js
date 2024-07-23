import { createJWT } from "../../helpers/index.js";

export default (sequelize, Sequelize) => {
  const UserSession = sequelize.define(
    "user_sessions",
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
      token: {
        type: Sequelize.STRING(500),
      },
      createdAt: {
        field: "created_at",
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "user_sessions",
    },
  );

  UserSession.createToken = async function (userId) {
    let userSession = await UserSession.create({
      token: await createJWT({ userId }),
      user_id: userId,
    });
    return userSession.token;
  };

  UserSession.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());

    ["created_at", "updated_at"].forEach((e) => delete values[e]);
    return values;
  };
  return UserSession;
};
