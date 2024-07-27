'use strict'
const { DataType } = require('sequelize-typescript')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Services', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      available: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      companyID: {
        type: DataType.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },
      categoryID: {
        type: DataType.UUID,
        references: {
          model: 'Categories',
          key: 'id',
        },
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Services')
  },
}
