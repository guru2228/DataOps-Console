const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('SuperAdmin'),
        name: 'Super Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('DataOpsDirector'),
        name: 'DataOps Director',
        createdAt,
        updatedAt,
      },

      {
        id: getId('IntegrationLead'),
        name: 'Integration Lead',
        createdAt,
        updatedAt,
      },

      {
        id: getId('QualityAssuranceSpecialist'),
        name: 'Quality Assurance Specialist',
        createdAt,
        updatedAt,
      },

      {
        id: getId('ClientOperationsManager'),
        name: 'Client Operations Manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('DataVendorAnalyst'),
        name: 'Data Vendor Analyst',
        createdAt,
        updatedAt,
      },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'connectors',
      'data_assets',
      'integrations',
      'pipeline_steps',
      'pipelines',
      'roles',
      'permissions',
      'client_orgs',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.bulkUpdate(
      'roles',
      { globalAccess: true },
      { id: getId('SuperAdmin') },
    );

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataVendorAnalyst'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('CREATE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('READ_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('UPDATE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('DELETE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('CREATE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('READ_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('UPDATE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('DELETE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('CREATE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('READ_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('UPDATE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('CREATE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('READ_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataVendorAnalyst'),
        permissionId: getId('CREATE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('CREATE_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('READ_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('UPDATE_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('DELETE_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('CREATE_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('READ_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('UPDATE_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('CREATE_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('READ_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('CREATE_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('READ_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataVendorAnalyst'),
        permissionId: getId('CREATE_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('CREATE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('READ_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('UPDATE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('DELETE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('CREATE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('READ_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('UPDATE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('DELETE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('CREATE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('READ_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('UPDATE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('CREATE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('READ_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataVendorAnalyst'),
        permissionId: getId('CREATE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('CREATE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('READ_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('UPDATE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('DELETE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('CREATE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('READ_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('UPDATE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('DELETE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('CREATE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('READ_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('UPDATE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('CREATE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('READ_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataVendorAnalyst'),
        permissionId: getId('CREATE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('CREATE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('READ_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('UPDATE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('DELETE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('CREATE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('READ_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('UPDATE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('DELETE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('CREATE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('READ_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('UPDATE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('CREATE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('READ_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataVendorAnalyst'),
        permissionId: getId('CREATE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataOpsDirector'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('IntegrationLead'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('QualityAssuranceSpecialist'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ClientOperationsManager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataVendorAnalyst'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CONNECTORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CONNECTORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CONNECTORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_DATA_ASSETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_DATA_ASSETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_DATA_ASSETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_INTEGRATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_INTEGRATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_INTEGRATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PIPELINE_STEPS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PIPELINE_STEPS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PIPELINE_STEPS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PIPELINES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PIPELINES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PIPELINES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_CONNECTORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_CONNECTORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_CONNECTORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_CONNECTORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_DATA_ASSETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_DATA_ASSETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_DATA_ASSETS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_DATA_ASSETS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_INTEGRATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_INTEGRATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_INTEGRATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_INTEGRATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PIPELINE_STEPS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PIPELINE_STEPS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PIPELINE_STEPS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PIPELINE_STEPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PIPELINES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PIPELINES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PIPELINES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PIPELINES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_CLIENT_ORGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_CLIENT_ORGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_CLIENT_ORGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_CLIENT_ORGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'DataOpsDirector',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'IntegrationLead',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
