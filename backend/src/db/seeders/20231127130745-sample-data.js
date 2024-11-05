const db = require('../models');
const Users = db.users;

const Connectors = db.connectors;

const DataAssets = db.data_assets;

const Integrations = db.integrations;

const PipelineSteps = db.pipeline_steps;

const Pipelines = db.pipelines;

const ClientOrgs = db.client_orgs;

const CliOrg = db.cli_org;

const CliOrgAdmins = db.cli_org_admins;

const CliOrgEntityInfo = db.cli_org_entity_info;

const CliOrgGrp = db.cli_org_grp;

const ConnectionSpec = db.connection_spec;

const ContactInfo = db.contact_info;

const DataAssetEntityMap = db.data_asset_entity_map;

const DataAssetInfo = db.data_asset_info;

const DataAssetType = db.data_asset_type;

const DataExtractDag = db.data_extract_dag;

const DataExtractRequest = db.data_extract_request;

const DataExtractTemplate = db.data_extract_template;

const EntityInfo = db.entity_info;

const IntegrationSpec = db.integration_spec;

const PayloadFieldSpec = db.payload_field_spec;

const PayloadLayoutSpec = db.payload_layout_spec;

const PayloadRecordSpec = db.payload_record_spec;

const PipelineSpec = db.pipeline_spec;

const PipelineStep = db.pipeline_step;

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

  {
    connector_spec: 'AWS S3 Connector Spec',

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

  {
    name: 'Supply Chain Management',

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

  {
    integration_name: 'HR System Integration',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const PipelineStepsData = [
  {
    step_name: 'Extract Leads',

    step_type: 'Enrich',

    // type code here for "relation_one" field
  },

  {
    step_name: 'Transform Data',

    step_type: 'Transform',

    // type code here for "relation_one" field
  },

  {
    step_name: 'Load to CRM',

    step_type: 'Extract',

    // type code here for "relation_one" field
  },

  {
    step_name: 'Enrich Data',

    step_type: 'Extract',

    // type code here for "relation_one" field
  },

  {
    step_name: 'Extract Contacts',

    step_type: 'Transform',

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

  {
    pipeline_spec: 'Raw Data Pipeline Spec',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const ClientOrgsData = [
  {
    name: 'Charles Darwin',
  },

  {
    name: 'Edward Teller',
  },

  {
    name: 'Max Planck',
  },

  {
    name: 'Albert Einstein',
  },

  {
    name: 'Tycho Brahe',
  },
];

const CliOrgData = [
  {
    cli_org_id: 'Jean Piaget',
  },

  {
    cli_org_id: 'Erwin Schrodinger',
  },

  {
    cli_org_id: 'Trofim Lysenko',
  },

  {
    cli_org_id: 'Sheldon Glashow',
  },

  {
    cli_org_id: 'Jean Piaget',
  },
];

const CliOrgAdminsData = [
  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },
];

const CliOrgEntityInfoData = [
  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },
];

const CliOrgGrpData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    start_dttm: new Date(),

    end_dttm: new Date(),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    start_dttm: new Date(),

    end_dttm: new Date(),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    start_dttm: new Date(),

    end_dttm: new Date(),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    start_dttm: new Date(),

    end_dttm: new Date(),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    start_dttm: new Date(),

    end_dttm: new Date(),
  },
];

const ConnectionSpecData = [{}, {}, {}, {}, {}];

const ContactInfoData = [
  {
    // type code here for "relation_one" field

    type: 'Robert Koch',

    role: 'Stephen Hawking',

    val: 'Nicolaus Copernicus',

    modified_at: new Date(),

    modified_by: 'Theodosius Dobzhansky',
  },

  {
    // type code here for "relation_one" field

    type: 'Willard Libby',

    role: 'George Gaylord Simpson',

    val: 'Louis Victor de Broglie',

    modified_at: new Date(),

    modified_by: 'Theodosius Dobzhansky',
  },

  {
    // type code here for "relation_one" field

    type: 'Christiaan Huygens',

    role: 'John Bardeen',

    val: 'Richard Feynman',

    modified_at: new Date(),

    modified_by: 'Andreas Vesalius',
  },

  {
    // type code here for "relation_one" field

    type: 'James Clerk Maxwell',

    role: 'Andreas Vesalius',

    val: 'Isaac Newton',

    modified_at: new Date(),

    modified_by: 'Nicolaus Copernicus',
  },

  {
    // type code here for "relation_one" field

    type: 'Lynn Margulis',

    role: 'Paul Ehrlich',

    val: 'Theodosius Dobzhansky',

    modified_at: new Date(),

    modified_by: 'Gregor Mendel',
  },
];

const DataAssetEntityMapData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    modified_at: new Date(),

    modified_by: 'Johannes Kepler',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    modified_at: new Date(),

    modified_by: 'Alfred Binet',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    modified_at: new Date(),

    modified_by: 'James Watson',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    modified_at: new Date(),

    modified_by: 'Ernest Rutherford',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    modified_at: new Date(),

    modified_by: 'Charles Lyell',
  },
];

const DataAssetInfoData = [
  {
    aide: 'Sigmund Freud',
  },

  {
    aide: 'Max Planck',
  },

  {
    aide: 'Dmitri Mendeleev',
  },

  {
    aide: 'Louis Pasteur',
  },

  {
    aide: 'Francis Crick',
  },
];

const DataAssetTypeData = [
  {
    // type code here for "relation_one" field

    type: 'James Watson',

    modified_at: new Date(),

    modified_by: 'Euclid',
  },

  {
    // type code here for "relation_one" field

    type: 'Leonard Euler',

    modified_at: new Date(),

    modified_by: 'Franz Boas',
  },

  {
    // type code here for "relation_one" field

    type: 'Trofim Lysenko',

    modified_at: new Date(),

    modified_by: 'J. Robert Oppenheimer',
  },

  {
    // type code here for "relation_one" field

    type: 'Arthur Eddington',

    modified_at: new Date(),

    modified_by: 'Ernest Rutherford',
  },

  {
    // type code here for "relation_one" field

    type: 'Emil Kraepelin',

    modified_at: new Date(),

    modified_by: 'Frederick Sanger',
  },
];

const DataExtractDagData = [
  {
    integratio_spec_id: 9,

    dag_pipeline: 'Stephen Hawking',

    modified_at: new Date(),

    modified_by: 'Max Delbruck',
  },

  {
    integratio_spec_id: 1,

    dag_pipeline: 'Ernest Rutherford',

    modified_at: new Date(),

    modified_by: 'Werner Heisenberg',
  },

  {
    integratio_spec_id: 5,

    dag_pipeline: 'Marcello Malpighi',

    modified_at: new Date(),

    modified_by: 'Nicolaus Copernicus',
  },

  {
    integratio_spec_id: 1,

    dag_pipeline: 'Thomas Hunt Morgan',

    modified_at: new Date(),

    modified_by: 'Gustav Kirchhoff',
  },

  {
    integratio_spec_id: 4,

    dag_pipeline: 'Noam Chomsky',

    modified_at: new Date(),

    modified_by: 'Michael Faraday',
  },
];

const DataExtractRequestData = [
  {
    // type code here for "relation_one" field

    form_values: 'Ernst Mayr',

    modified_at: new Date(),

    modified_by: 'Ludwig Boltzmann',
  },

  {
    // type code here for "relation_one" field

    form_values: 'Linus Pauling',

    modified_at: new Date(),

    modified_by: 'William Bayliss',
  },

  {
    // type code here for "relation_one" field

    form_values: 'Max Planck',

    modified_at: new Date(),

    modified_by: 'Charles Darwin',
  },

  {
    // type code here for "relation_one" field

    form_values: 'John Bardeen',

    modified_at: new Date(),

    modified_by: 'Alexander Fleming',
  },

  {
    // type code here for "relation_one" field

    form_values: 'Marcello Malpighi',

    modified_at: new Date(),

    modified_by: 'Max von Laue',
  },
];

const DataExtractTemplateData = [
  {
    asset_aide: 'Nicolaus Copernicus',

    entity_aide: 'Murray Gell-Mann',

    // type code here for "relation_one" field

    form_template_id: 9,

    form_template: 'Marcello Malpighi',

    modified_at: new Date(),

    modified_by: 'Alexander Fleming',
  },

  {
    asset_aide: 'Nicolaus Copernicus',

    entity_aide: 'Galileo Galilei',

    // type code here for "relation_one" field

    form_template_id: 9,

    form_template: 'George Gaylord Simpson',

    modified_at: new Date(),

    modified_by: 'Willard Libby',
  },

  {
    asset_aide: 'Carl Gauss (Karl Friedrich Gauss)',

    entity_aide: 'Edward Teller',

    // type code here for "relation_one" field

    form_template_id: 7,

    form_template: 'William Herschel',

    modified_at: new Date(),

    modified_by: 'Jean Baptiste Lamarck',
  },

  {
    asset_aide: 'Andreas Vesalius',

    entity_aide: 'Leonard Euler',

    // type code here for "relation_one" field

    form_template_id: 2,

    form_template: 'Claude Bernard',

    modified_at: new Date(),

    modified_by: 'Gregor Mendel',
  },

  {
    asset_aide: 'Comte de Buffon',

    entity_aide: 'Tycho Brahe',

    // type code here for "relation_one" field

    form_template_id: 8,

    form_template: 'Alexander Fleming',

    modified_at: new Date(),

    modified_by: 'Alexander Fleming',
  },
];

const EntityInfoData = [
  {
    aide: 'Wilhelm Wundt',
  },

  {
    aide: 'Justus Liebig',
  },

  {
    aide: 'Christiaan Huygens',
  },

  {
    aide: 'Hermann von Helmholtz',
  },

  {
    aide: 'Claude Levi-Strauss',
  },
];

const IntegrationSpecData = [{}, {}, {}, {}, {}];

const PayloadFieldSpecData = [
  {
    payload_field_spec_id: 5,
  },

  {
    payload_field_spec_id: 2,
  },

  {
    payload_field_spec_id: 8,
  },

  {
    payload_field_spec_id: 5,
  },

  {
    payload_field_spec_id: 2,
  },
];

const PayloadLayoutSpecData = [
  {
    payload_layout_spec_id: 9,
  },

  {
    payload_layout_spec_id: 2,
  },

  {
    payload_layout_spec_id: 7,
  },

  {
    payload_layout_spec_id: 4,
  },

  {
    payload_layout_spec_id: 8,
  },
];

const PayloadRecordSpecData = [
  {
    payload_record_spec_id: 2,
  },

  {
    payload_record_spec_id: 6,
  },

  {
    payload_record_spec_id: 2,
  },

  {
    payload_record_spec_id: 2,
  },

  {
    payload_record_spec_id: 3,
  },
];

const PipelineSpecData = [{}, {}, {}, {}, {}];

const PipelineStepData = [{}, {}, {}, {}, {}];

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

  const relatedClient_org4 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setClient_org) {
    await User4.setClient_org(relatedClient_org4);
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

  const relatedClient_org4 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Connector4 = await Connectors.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Connector4?.setClient_org) {
    await Connector4.setClient_org(relatedClient_org4);
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

  const relatedOwner4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const DataAsset4 = await DataAssets.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DataAsset4?.setOwner) {
    await DataAsset4.setOwner(relatedOwner4);
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

  const relatedClient_org4 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const DataAsset4 = await DataAssets.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DataAsset4?.setClient_org) {
    await DataAsset4.setClient_org(relatedClient_org4);
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

  const relatedClient_org4 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Integration4 = await Integrations.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Integration4?.setClient_org) {
    await Integration4.setClient_org(relatedClient_org4);
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

  const relatedClient_org4 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const PipelineStep4 = await PipelineSteps.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PipelineStep4?.setClient_org) {
    await PipelineStep4.setClient_org(relatedClient_org4);
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

  const relatedClient_org4 = await ClientOrgs.findOne({
    offset: Math.floor(Math.random() * (await ClientOrgs.count())),
  });
  const Pipeline4 = await Pipelines.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Pipeline4?.setClient_org) {
    await Pipeline4.setClient_org(relatedClient_org4);
  }
}

async function associateCliOrgAdminWithCli_org_id() {
  const relatedCli_org_id0 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgAdmin0 = await CliOrgAdmins.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CliOrgAdmin0?.setCli_org_id) {
    await CliOrgAdmin0.setCli_org_id(relatedCli_org_id0);
  }

  const relatedCli_org_id1 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgAdmin1 = await CliOrgAdmins.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CliOrgAdmin1?.setCli_org_id) {
    await CliOrgAdmin1.setCli_org_id(relatedCli_org_id1);
  }

  const relatedCli_org_id2 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgAdmin2 = await CliOrgAdmins.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CliOrgAdmin2?.setCli_org_id) {
    await CliOrgAdmin2.setCli_org_id(relatedCli_org_id2);
  }

  const relatedCli_org_id3 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgAdmin3 = await CliOrgAdmins.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (CliOrgAdmin3?.setCli_org_id) {
    await CliOrgAdmin3.setCli_org_id(relatedCli_org_id3);
  }

  const relatedCli_org_id4 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgAdmin4 = await CliOrgAdmins.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (CliOrgAdmin4?.setCli_org_id) {
    await CliOrgAdmin4.setCli_org_id(relatedCli_org_id4);
  }
}

async function associateCliOrgAdminWithUser_id() {
  const relatedUser_id0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CliOrgAdmin0 = await CliOrgAdmins.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CliOrgAdmin0?.setUser_id) {
    await CliOrgAdmin0.setUser_id(relatedUser_id0);
  }

  const relatedUser_id1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CliOrgAdmin1 = await CliOrgAdmins.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CliOrgAdmin1?.setUser_id) {
    await CliOrgAdmin1.setUser_id(relatedUser_id1);
  }

  const relatedUser_id2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CliOrgAdmin2 = await CliOrgAdmins.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CliOrgAdmin2?.setUser_id) {
    await CliOrgAdmin2.setUser_id(relatedUser_id2);
  }

  const relatedUser_id3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CliOrgAdmin3 = await CliOrgAdmins.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (CliOrgAdmin3?.setUser_id) {
    await CliOrgAdmin3.setUser_id(relatedUser_id3);
  }

  const relatedUser_id4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CliOrgAdmin4 = await CliOrgAdmins.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (CliOrgAdmin4?.setUser_id) {
    await CliOrgAdmin4.setUser_id(relatedUser_id4);
  }
}

async function associateCliOrgEntityInfoWithCli_org_aide() {
  const relatedCli_org_aide0 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgEntityInfo0 = await CliOrgEntityInfo.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CliOrgEntityInfo0?.setCli_org_aide) {
    await CliOrgEntityInfo0.setCli_org_aide(relatedCli_org_aide0);
  }

  const relatedCli_org_aide1 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgEntityInfo1 = await CliOrgEntityInfo.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CliOrgEntityInfo1?.setCli_org_aide) {
    await CliOrgEntityInfo1.setCli_org_aide(relatedCli_org_aide1);
  }

  const relatedCli_org_aide2 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgEntityInfo2 = await CliOrgEntityInfo.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CliOrgEntityInfo2?.setCli_org_aide) {
    await CliOrgEntityInfo2.setCli_org_aide(relatedCli_org_aide2);
  }

  const relatedCli_org_aide3 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgEntityInfo3 = await CliOrgEntityInfo.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (CliOrgEntityInfo3?.setCli_org_aide) {
    await CliOrgEntityInfo3.setCli_org_aide(relatedCli_org_aide3);
  }

  const relatedCli_org_aide4 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgEntityInfo4 = await CliOrgEntityInfo.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (CliOrgEntityInfo4?.setCli_org_aide) {
    await CliOrgEntityInfo4.setCli_org_aide(relatedCli_org_aide4);
  }
}

async function associateCliOrgEntityInfoWithEntity_info_aide() {
  const relatedEntity_info_aide0 = await EntityInfo.findOne({
    offset: Math.floor(Math.random() * (await EntityInfo.count())),
  });
  const CliOrgEntityInfo0 = await CliOrgEntityInfo.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CliOrgEntityInfo0?.setEntity_info_aide) {
    await CliOrgEntityInfo0.setEntity_info_aide(relatedEntity_info_aide0);
  }

  const relatedEntity_info_aide1 = await EntityInfo.findOne({
    offset: Math.floor(Math.random() * (await EntityInfo.count())),
  });
  const CliOrgEntityInfo1 = await CliOrgEntityInfo.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CliOrgEntityInfo1?.setEntity_info_aide) {
    await CliOrgEntityInfo1.setEntity_info_aide(relatedEntity_info_aide1);
  }

  const relatedEntity_info_aide2 = await EntityInfo.findOne({
    offset: Math.floor(Math.random() * (await EntityInfo.count())),
  });
  const CliOrgEntityInfo2 = await CliOrgEntityInfo.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CliOrgEntityInfo2?.setEntity_info_aide) {
    await CliOrgEntityInfo2.setEntity_info_aide(relatedEntity_info_aide2);
  }

  const relatedEntity_info_aide3 = await EntityInfo.findOne({
    offset: Math.floor(Math.random() * (await EntityInfo.count())),
  });
  const CliOrgEntityInfo3 = await CliOrgEntityInfo.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (CliOrgEntityInfo3?.setEntity_info_aide) {
    await CliOrgEntityInfo3.setEntity_info_aide(relatedEntity_info_aide3);
  }

  const relatedEntity_info_aide4 = await EntityInfo.findOne({
    offset: Math.floor(Math.random() * (await EntityInfo.count())),
  });
  const CliOrgEntityInfo4 = await CliOrgEntityInfo.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (CliOrgEntityInfo4?.setEntity_info_aide) {
    await CliOrgEntityInfo4.setEntity_info_aide(relatedEntity_info_aide4);
  }
}

async function associateCliOrgGrpWithCli_org_grp_id() {
  const relatedCli_org_grp_id0 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgGrp0 = await CliOrgGrp.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CliOrgGrp0?.setCli_org_grp_id) {
    await CliOrgGrp0.setCli_org_grp_id(relatedCli_org_grp_id0);
  }

  const relatedCli_org_grp_id1 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgGrp1 = await CliOrgGrp.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CliOrgGrp1?.setCli_org_grp_id) {
    await CliOrgGrp1.setCli_org_grp_id(relatedCli_org_grp_id1);
  }

  const relatedCli_org_grp_id2 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgGrp2 = await CliOrgGrp.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CliOrgGrp2?.setCli_org_grp_id) {
    await CliOrgGrp2.setCli_org_grp_id(relatedCli_org_grp_id2);
  }

  const relatedCli_org_grp_id3 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgGrp3 = await CliOrgGrp.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (CliOrgGrp3?.setCli_org_grp_id) {
    await CliOrgGrp3.setCli_org_grp_id(relatedCli_org_grp_id3);
  }

  const relatedCli_org_grp_id4 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgGrp4 = await CliOrgGrp.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (CliOrgGrp4?.setCli_org_grp_id) {
    await CliOrgGrp4.setCli_org_grp_id(relatedCli_org_grp_id4);
  }
}

async function associateCliOrgGrpWithCli_org_id() {
  const relatedCli_org_id0 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgGrp0 = await CliOrgGrp.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CliOrgGrp0?.setCli_org_id) {
    await CliOrgGrp0.setCli_org_id(relatedCli_org_id0);
  }

  const relatedCli_org_id1 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgGrp1 = await CliOrgGrp.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CliOrgGrp1?.setCli_org_id) {
    await CliOrgGrp1.setCli_org_id(relatedCli_org_id1);
  }

  const relatedCli_org_id2 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgGrp2 = await CliOrgGrp.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CliOrgGrp2?.setCli_org_id) {
    await CliOrgGrp2.setCli_org_id(relatedCli_org_id2);
  }

  const relatedCli_org_id3 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgGrp3 = await CliOrgGrp.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (CliOrgGrp3?.setCli_org_id) {
    await CliOrgGrp3.setCli_org_id(relatedCli_org_id3);
  }

  const relatedCli_org_id4 = await CliOrg.findOne({
    offset: Math.floor(Math.random() * (await CliOrg.count())),
  });
  const CliOrgGrp4 = await CliOrgGrp.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (CliOrgGrp4?.setCli_org_id) {
    await CliOrgGrp4.setCli_org_id(relatedCli_org_id4);
  }
}

async function associateContactInfoWithAide() {
  const relatedAide0 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const ContactInfo0 = await ContactInfo.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ContactInfo0?.setAide) {
    await ContactInfo0.setAide(relatedAide0);
  }

  const relatedAide1 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const ContactInfo1 = await ContactInfo.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ContactInfo1?.setAide) {
    await ContactInfo1.setAide(relatedAide1);
  }

  const relatedAide2 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const ContactInfo2 = await ContactInfo.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ContactInfo2?.setAide) {
    await ContactInfo2.setAide(relatedAide2);
  }

  const relatedAide3 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const ContactInfo3 = await ContactInfo.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ContactInfo3?.setAide) {
    await ContactInfo3.setAide(relatedAide3);
  }

  const relatedAide4 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const ContactInfo4 = await ContactInfo.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ContactInfo4?.setAide) {
    await ContactInfo4.setAide(relatedAide4);
  }
}

async function associateDataAssetEntityMapWithAsset_aide() {
  const relatedAsset_aide0 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const DataAssetEntityMap0 = await DataAssetEntityMap.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DataAssetEntityMap0?.setAsset_aide) {
    await DataAssetEntityMap0.setAsset_aide(relatedAsset_aide0);
  }

  const relatedAsset_aide1 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const DataAssetEntityMap1 = await DataAssetEntityMap.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DataAssetEntityMap1?.setAsset_aide) {
    await DataAssetEntityMap1.setAsset_aide(relatedAsset_aide1);
  }

  const relatedAsset_aide2 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const DataAssetEntityMap2 = await DataAssetEntityMap.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DataAssetEntityMap2?.setAsset_aide) {
    await DataAssetEntityMap2.setAsset_aide(relatedAsset_aide2);
  }

  const relatedAsset_aide3 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const DataAssetEntityMap3 = await DataAssetEntityMap.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DataAssetEntityMap3?.setAsset_aide) {
    await DataAssetEntityMap3.setAsset_aide(relatedAsset_aide3);
  }

  const relatedAsset_aide4 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const DataAssetEntityMap4 = await DataAssetEntityMap.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DataAssetEntityMap4?.setAsset_aide) {
    await DataAssetEntityMap4.setAsset_aide(relatedAsset_aide4);
  }
}

async function associateDataAssetEntityMapWithEntity_aide() {
  const relatedEntity_aide0 = await EntityInfo.findOne({
    offset: Math.floor(Math.random() * (await EntityInfo.count())),
  });
  const DataAssetEntityMap0 = await DataAssetEntityMap.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DataAssetEntityMap0?.setEntity_aide) {
    await DataAssetEntityMap0.setEntity_aide(relatedEntity_aide0);
  }

  const relatedEntity_aide1 = await EntityInfo.findOne({
    offset: Math.floor(Math.random() * (await EntityInfo.count())),
  });
  const DataAssetEntityMap1 = await DataAssetEntityMap.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DataAssetEntityMap1?.setEntity_aide) {
    await DataAssetEntityMap1.setEntity_aide(relatedEntity_aide1);
  }

  const relatedEntity_aide2 = await EntityInfo.findOne({
    offset: Math.floor(Math.random() * (await EntityInfo.count())),
  });
  const DataAssetEntityMap2 = await DataAssetEntityMap.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DataAssetEntityMap2?.setEntity_aide) {
    await DataAssetEntityMap2.setEntity_aide(relatedEntity_aide2);
  }

  const relatedEntity_aide3 = await EntityInfo.findOne({
    offset: Math.floor(Math.random() * (await EntityInfo.count())),
  });
  const DataAssetEntityMap3 = await DataAssetEntityMap.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DataAssetEntityMap3?.setEntity_aide) {
    await DataAssetEntityMap3.setEntity_aide(relatedEntity_aide3);
  }

  const relatedEntity_aide4 = await EntityInfo.findOne({
    offset: Math.floor(Math.random() * (await EntityInfo.count())),
  });
  const DataAssetEntityMap4 = await DataAssetEntityMap.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DataAssetEntityMap4?.setEntity_aide) {
    await DataAssetEntityMap4.setEntity_aide(relatedEntity_aide4);
  }
}

async function associateDataAssetTypeWithAide() {
  const relatedAide0 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const DataAssetType0 = await DataAssetType.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DataAssetType0?.setAide) {
    await DataAssetType0.setAide(relatedAide0);
  }

  const relatedAide1 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const DataAssetType1 = await DataAssetType.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DataAssetType1?.setAide) {
    await DataAssetType1.setAide(relatedAide1);
  }

  const relatedAide2 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const DataAssetType2 = await DataAssetType.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DataAssetType2?.setAide) {
    await DataAssetType2.setAide(relatedAide2);
  }

  const relatedAide3 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const DataAssetType3 = await DataAssetType.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DataAssetType3?.setAide) {
    await DataAssetType3.setAide(relatedAide3);
  }

  const relatedAide4 = await DataAssetInfo.findOne({
    offset: Math.floor(Math.random() * (await DataAssetInfo.count())),
  });
  const DataAssetType4 = await DataAssetType.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DataAssetType4?.setAide) {
    await DataAssetType4.setAide(relatedAide4);
  }
}

async function associateDataExtractRequestWithForm_template_id() {
  const relatedForm_template_id0 = await DataExtractTemplate.findOne({
    offset: Math.floor(Math.random() * (await DataExtractTemplate.count())),
  });
  const DataExtractRequest0 = await DataExtractRequest.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DataExtractRequest0?.setForm_template_id) {
    await DataExtractRequest0.setForm_template_id(relatedForm_template_id0);
  }

  const relatedForm_template_id1 = await DataExtractTemplate.findOne({
    offset: Math.floor(Math.random() * (await DataExtractTemplate.count())),
  });
  const DataExtractRequest1 = await DataExtractRequest.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DataExtractRequest1?.setForm_template_id) {
    await DataExtractRequest1.setForm_template_id(relatedForm_template_id1);
  }

  const relatedForm_template_id2 = await DataExtractTemplate.findOne({
    offset: Math.floor(Math.random() * (await DataExtractTemplate.count())),
  });
  const DataExtractRequest2 = await DataExtractRequest.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DataExtractRequest2?.setForm_template_id) {
    await DataExtractRequest2.setForm_template_id(relatedForm_template_id2);
  }

  const relatedForm_template_id3 = await DataExtractTemplate.findOne({
    offset: Math.floor(Math.random() * (await DataExtractTemplate.count())),
  });
  const DataExtractRequest3 = await DataExtractRequest.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DataExtractRequest3?.setForm_template_id) {
    await DataExtractRequest3.setForm_template_id(relatedForm_template_id3);
  }

  const relatedForm_template_id4 = await DataExtractTemplate.findOne({
    offset: Math.floor(Math.random() * (await DataExtractTemplate.count())),
  });
  const DataExtractRequest4 = await DataExtractRequest.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DataExtractRequest4?.setForm_template_id) {
    await DataExtractRequest4.setForm_template_id(relatedForm_template_id4);
  }
}

async function associateDataExtractTemplateWithIntegratio_spec_id() {
  const relatedIntegratio_spec_id0 = await DataExtractDag.findOne({
    offset: Math.floor(Math.random() * (await DataExtractDag.count())),
  });
  const DataExtractTemplate0 = await DataExtractTemplate.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DataExtractTemplate0?.setIntegratio_spec_id) {
    await DataExtractTemplate0.setIntegratio_spec_id(
      relatedIntegratio_spec_id0,
    );
  }

  const relatedIntegratio_spec_id1 = await DataExtractDag.findOne({
    offset: Math.floor(Math.random() * (await DataExtractDag.count())),
  });
  const DataExtractTemplate1 = await DataExtractTemplate.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DataExtractTemplate1?.setIntegratio_spec_id) {
    await DataExtractTemplate1.setIntegratio_spec_id(
      relatedIntegratio_spec_id1,
    );
  }

  const relatedIntegratio_spec_id2 = await DataExtractDag.findOne({
    offset: Math.floor(Math.random() * (await DataExtractDag.count())),
  });
  const DataExtractTemplate2 = await DataExtractTemplate.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DataExtractTemplate2?.setIntegratio_spec_id) {
    await DataExtractTemplate2.setIntegratio_spec_id(
      relatedIntegratio_spec_id2,
    );
  }

  const relatedIntegratio_spec_id3 = await DataExtractDag.findOne({
    offset: Math.floor(Math.random() * (await DataExtractDag.count())),
  });
  const DataExtractTemplate3 = await DataExtractTemplate.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DataExtractTemplate3?.setIntegratio_spec_id) {
    await DataExtractTemplate3.setIntegratio_spec_id(
      relatedIntegratio_spec_id3,
    );
  }

  const relatedIntegratio_spec_id4 = await DataExtractDag.findOne({
    offset: Math.floor(Math.random() * (await DataExtractDag.count())),
  });
  const DataExtractTemplate4 = await DataExtractTemplate.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DataExtractTemplate4?.setIntegratio_spec_id) {
    await DataExtractTemplate4.setIntegratio_spec_id(
      relatedIntegratio_spec_id4,
    );
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

    await CliOrg.bulkCreate(CliOrgData);

    await CliOrgAdmins.bulkCreate(CliOrgAdminsData);

    await CliOrgEntityInfo.bulkCreate(CliOrgEntityInfoData);

    await CliOrgGrp.bulkCreate(CliOrgGrpData);

    await ConnectionSpec.bulkCreate(ConnectionSpecData);

    await ContactInfo.bulkCreate(ContactInfoData);

    await DataAssetEntityMap.bulkCreate(DataAssetEntityMapData);

    await DataAssetInfo.bulkCreate(DataAssetInfoData);

    await DataAssetType.bulkCreate(DataAssetTypeData);

    await DataExtractDag.bulkCreate(DataExtractDagData);

    await DataExtractRequest.bulkCreate(DataExtractRequestData);

    await DataExtractTemplate.bulkCreate(DataExtractTemplateData);

    await EntityInfo.bulkCreate(EntityInfoData);

    await IntegrationSpec.bulkCreate(IntegrationSpecData);

    await PayloadFieldSpec.bulkCreate(PayloadFieldSpecData);

    await PayloadLayoutSpec.bulkCreate(PayloadLayoutSpecData);

    await PayloadRecordSpec.bulkCreate(PayloadRecordSpecData);

    await PipelineSpec.bulkCreate(PipelineSpecData);

    await PipelineStep.bulkCreate(PipelineStepData);

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

      await associateCliOrgAdminWithCli_org_id(),

      await associateCliOrgAdminWithUser_id(),

      await associateCliOrgEntityInfoWithCli_org_aide(),

      await associateCliOrgEntityInfoWithEntity_info_aide(),

      await associateCliOrgGrpWithCli_org_grp_id(),

      await associateCliOrgGrpWithCli_org_id(),

      await associateContactInfoWithAide(),

      await associateDataAssetEntityMapWithAsset_aide(),

      await associateDataAssetEntityMapWithEntity_aide(),

      await associateDataAssetTypeWithAide(),

      await associateDataExtractRequestWithForm_template_id(),

      await associateDataExtractTemplateWithIntegratio_spec_id(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('connectors', null, {});

    await queryInterface.bulkDelete('data_assets', null, {});

    await queryInterface.bulkDelete('integrations', null, {});

    await queryInterface.bulkDelete('pipeline_steps', null, {});

    await queryInterface.bulkDelete('pipelines', null, {});

    await queryInterface.bulkDelete('client_orgs', null, {});

    await queryInterface.bulkDelete('cli_org', null, {});

    await queryInterface.bulkDelete('cli_org_admins', null, {});

    await queryInterface.bulkDelete('cli_org_entity_info', null, {});

    await queryInterface.bulkDelete('cli_org_grp', null, {});

    await queryInterface.bulkDelete('connection_spec', null, {});

    await queryInterface.bulkDelete('contact_info', null, {});

    await queryInterface.bulkDelete('data_asset_entity_map', null, {});

    await queryInterface.bulkDelete('data_asset_info', null, {});

    await queryInterface.bulkDelete('data_asset_type', null, {});

    await queryInterface.bulkDelete('data_extract_dag', null, {});

    await queryInterface.bulkDelete('data_extract_request', null, {});

    await queryInterface.bulkDelete('data_extract_template', null, {});

    await queryInterface.bulkDelete('entity_info', null, {});

    await queryInterface.bulkDelete('integration_spec', null, {});

    await queryInterface.bulkDelete('payload_field_spec', null, {});

    await queryInterface.bulkDelete('payload_layout_spec', null, {});

    await queryInterface.bulkDelete('payload_record_spec', null, {});

    await queryInterface.bulkDelete('pipeline_spec', null, {});

    await queryInterface.bulkDelete('pipeline_step', null, {});
  },
};
