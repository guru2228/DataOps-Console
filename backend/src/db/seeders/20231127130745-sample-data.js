const db = require('../models');
const Users = db.users;

const Connectors = db.connectors;

const DataAssets = db.data_assets;

const Integrations = db.integrations;

const PipelineSteps = db.pipeline_steps;

const Pipelines = db.pipelines;

const ClientOrgs = db.client_orgs;

const ConnectorsData = [
  {
    connector_spec: 'Salesforce Connector Spec',

    // type code here for "relation_one" field
  },

  {
    connector_spec: 'HubSpot Connector Spec',

    // type code here for "relation_one" field
  },

  {
    connector_spec: 'SAP Connector Spec',

    // type code here for "relation_one" field
  },

  {
    connector_spec: 'Oracle Connector Spec',

    // type code here for "relation_one" field
  },
];

const DataAssetsData = [
  {
    name: 'Customer Data Warehouse',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Sales Analytics Platform',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Marketing Insights Hub',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Financial Reporting System',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const IntegrationsData = [
  {
    integration_name: 'CRM Integration',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    integration_name: 'ERP Sync',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    integration_name: 'Data Lake Ingestion',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    integration_name: 'API Gateway',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const PipelineStepsData = [
  {
    step_name: 'Extract Leads',

    step_type: 'Load',

    // type code here for "relation_one" field
  },

  {
    step_name: 'Transform Data',

    step_type: 'Extract',

    // type code here for "relation_one" field
  },

  {
    step_name: 'Load to CRM',

    step_type: 'Extract',

    // type code here for "relation_one" field
  },

  {
    step_name: 'Enrich Data',

    step_type: 'Enrich',

    // type code here for "relation_one" field
  },
];

const PipelinesData = [
  {
    pipeline_spec: 'Lead Data Pipeline Spec',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    pipeline_spec: 'Contact Sync Pipeline Spec',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    pipeline_spec: 'Inventory Data Pipeline Spec',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    pipeline_spec: 'Order Sync Pipeline Spec',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const ClientOrgsData = [
  {
    name: 'Antoine Laurent Lavoisier',
  },

  {
    name: 'Heike Kamerlingh Onnes',
  },

  {
    name: 'Isaac Newton',
  },

  {
    name: 'Charles Lyell',
  },
];

// Similar logic for "relation_many"

async function associateUserWithClient_org() {
  const relatedClient_org0 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setClient_org) {
    await User0.setClient_org(relatedClient_org0);
  }

  const relatedClient_org1 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setClient_org) {
    await User1.setClient_org(relatedClient_org1);
  }

  const relatedClient_org2 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setClient_org) {
    await User2.setClient_org(relatedClient_org2);
  }

  const relatedClient_org3 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setClient_org) {
    await User3.setClient_org(relatedClient_org3);
  }
}

async function associateConnectorWithClient_org() {
  const relatedClient_org0 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Connector0 = await Connectors.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Connector0?.setClient_org) {
    await Connector0.setClient_org(relatedClient_org0);
  }

  const relatedClient_org1 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Connector1 = await Connectors.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Connector1?.setClient_org) {
    await Connector1.setClient_org(relatedClient_org1);
  }

  const relatedClient_org2 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Connector2 = await Connectors.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Connector2?.setClient_org) {
    await Connector2.setClient_org(relatedClient_org2);
  }

  const relatedClient_org3 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Connector3 = await Connectors.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Connector3?.setClient_org) {
    await Connector3.setClient_org(relatedClient_org3);
  }
}

async function associateDataAssetWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const DataAsset0 = await DataAssets.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DataAsset0?.setOwner) {
    await DataAsset0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const DataAsset1 = await DataAssets.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DataAsset1?.setOwner) {
    await DataAsset1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const DataAsset2 = await DataAssets.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DataAsset2?.setOwner) {
    await DataAsset2.setOwner(relatedOwner2);
  }

  const relatedOwner3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const DataAsset3 = await DataAssets.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DataAsset3?.setOwner) {
    await DataAsset3.setOwner(relatedOwner3);
  }
}

async function associateDataAssetWithClient_org() {
  const relatedClient_org0 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const DataAsset0 = await DataAssets.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DataAsset0?.setClient_org) {
    await DataAsset0.setClient_org(relatedClient_org0);
  }

  const relatedClient_org1 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const DataAsset1 = await DataAssets.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DataAsset1?.setClient_org) {
    await DataAsset1.setClient_org(relatedClient_org1);
  }

  const relatedClient_org2 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const DataAsset2 = await DataAssets.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DataAsset2?.setClient_org) {
    await DataAsset2.setClient_org(relatedClient_org2);
  }

  const relatedClient_org3 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const DataAsset3 = await DataAssets.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DataAsset3?.setClient_org) {
    await DataAsset3.setClient_org(relatedClient_org3);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateIntegrationWithClient_org() {
  const relatedClient_org0 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Integration0 = await Integrations.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Integration0?.setClient_org) {
    await Integration0.setClient_org(relatedClient_org0);
  }

  const relatedClient_org1 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Integration1 = await Integrations.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Integration1?.setClient_org) {
    await Integration1.setClient_org(relatedClient_org1);
  }

  const relatedClient_org2 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Integration2 = await Integrations.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Integration2?.setClient_org) {
    await Integration2.setClient_org(relatedClient_org2);
  }

  const relatedClient_org3 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Integration3 = await Integrations.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Integration3?.setClient_org) {
    await Integration3.setClient_org(relatedClient_org3);
  }
}

async function associatePipelineStepWithClient_org() {
  const relatedClient_org0 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const PipelineStep0 = await PipelineSteps.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PipelineStep0?.setClient_org) {
    await PipelineStep0.setClient_org(relatedClient_org0);
  }

  const relatedClient_org1 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const PipelineStep1 = await PipelineSteps.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PipelineStep1?.setClient_org) {
    await PipelineStep1.setClient_org(relatedClient_org1);
  }

  const relatedClient_org2 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const PipelineStep2 = await PipelineSteps.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PipelineStep2?.setClient_org) {
    await PipelineStep2.setClient_org(relatedClient_org2);
  }

  const relatedClient_org3 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const PipelineStep3 = await PipelineSteps.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PipelineStep3?.setClient_org) {
    await PipelineStep3.setClient_org(relatedClient_org3);
  }
}

// Similar logic for "relation_many"

async function associatePipelineWithClient_org() {
  const relatedClient_org0 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Pipeline0 = await Pipelines.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Pipeline0?.setClient_org) {
    await Pipeline0.setClient_org(relatedClient_org0);
  }

  const relatedClient_org1 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Pipeline1 = await Pipelines.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Pipeline1?.setClient_org) {
    await Pipeline1.setClient_org(relatedClient_org1);
  }

  const relatedClient_org2 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Pipeline2 = await Pipelines.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Pipeline2?.setClient_org) {
    await Pipeline2.setClient_org(relatedClient_org2);
  }

  const relatedClient_org3 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Pipeline3 = await Pipelines.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Pipeline3?.setClient_org) {
    await Pipeline3.setClient_org(relatedClient_org3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Connectors.bulkCreate(ConnectorsData);

    await DataAssets.bulkCreate(DataAssetsData);

    await Integrations.bulkCreate(IntegrationsData);

    await PipelineSteps.bulkCreate(PipelineStepsData);

    await Pipelines.bulkCreate(PipelinesData);

    await ClientOrgs.bulkCreate(ClientOrgsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithClient_org(),

      await associateConnectorWithClient_org(),

      await associateDataAssetWithOwner(),

      await associateDataAssetWithClient_org(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateIntegrationWithClient_org(),

      await associatePipelineStepWithClient_org(),

      // Similar logic for "relation_many"

      await associatePipelineWithClient_org(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('connectors', null, {});

    await queryInterface.bulkDelete('data_assets', null, {});

    await queryInterface.bulkDelete('integrations', null, {});

    await queryInterface.bulkDelete('pipeline_steps', null, {});

    await queryInterface.bulkDelete('pipelines', null, {});

    await queryInterface.bulkDelete('client_orgs', null, {});
  },
};
