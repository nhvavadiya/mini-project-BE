import { createJWT } from "../../helpers/index.js";

export default (sequelize, Sequelize) => {
  const AdminSession = sequelize.define(
    "admin_sessions",
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
      tableName: "admin_sessions",
    },
  );

  AdminSession.createToken = async function (adminId) {
    let adminSession = await AdminSession.create({
      token: await createJWT({ adminId }),
      admin_id: adminId,
    });
    return adminSession.token;
  };

  AdminSession.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());

    ["created_at", "updated_at"].forEach((e) => delete values[e]);
    return values;
  };
  return AdminSession;
};
