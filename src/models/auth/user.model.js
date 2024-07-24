export default (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      phone_no: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM("admin", "user"),
        allowNull: false,
      },
      socket_id: {
        type: Sequelize.STRING(200),
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
      tableName: "users",
    },
  );

  Users.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    // delete values.password;

    //This will remove field from json object (note after create/update method  json object require this)
    ["password", "active", "updatedAt"].forEach((e) => delete values[e]);
    return values;
  };

  //Refer : https://stackoverflow.com/a/50291209/7493808
  Users.isExistField = function (fieldName, fieldValue) {
    return Users.count({
      where: {
        [fieldName]: fieldValue,
      },
    }).then((count) => {
      if (count != 0) {
        return true;
      }
      return false;
    });
  };

  return Users;
};
