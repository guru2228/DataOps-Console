import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/connectors/connectors-list',
    label: 'Connectors',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiPlug ? icon.mdiPlug : icon.mdiTable,
    permissions: 'READ_CONNECTORS',
  },
  {
    href: '/data_assets/data_assets-list',
    label: 'Data assets',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiDatabase ? icon.mdiDatabase : icon.mdiTable,
    permissions: 'READ_DATA_ASSETS',
  },
  {
    href: '/integrations/integrations-list',
    label: 'Integrations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiLink ? icon.mdiLink : icon.mdiTable,
    permissions: 'READ_INTEGRATIONS',
  },
  {
    href: '/pipeline_steps/pipeline_steps-list',
    label: 'Pipeline steps',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiStepForward ? icon.mdiStepForward : icon.mdiTable,
    permissions: 'READ_PIPELINE_STEPS',
  },
  {
    href: '/pipelines/pipelines-list',
    label: 'Pipelines',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiPipe ? icon.mdiPipe : icon.mdiTable,
    permissions: 'READ_PIPELINES',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/client_orgs/client_orgs-list',
    label: 'Client orgs',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_CLIENT_ORGS',
  },
  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/cli_org/cli_org-list',
    label: 'Cli org',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_CLI_ORG',
  },
  {
    href: '/cli_org_admins/cli_org_admins-list',
    label: 'Cli org admins',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_CLI_ORG_ADMINS',
  },
  {
    href: '/cli_org_entity_info/cli_org_entity_info-list',
    label: 'Cli org entity info',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_CLI_ORG_ENTITY_INFO',
  },
  {
    href: '/cli_org_grp/cli_org_grp-list',
    label: 'Cli org grp',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_CLI_ORG_GRP',
  },
  {
    href: '/connection_spec/connection_spec-list',
    label: 'Connection spec',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_CONNECTION_SPEC',
  },
  {
    href: '/contact_info/contact_info-list',
    label: 'Contact info',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_CONTACT_INFO',
  },
  {
    href: '/data_asset_entity_map/data_asset_entity_map-list',
    label: 'Data asset entity map',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_DATA_ASSET_ENTITY_MAP',
  },
  {
    href: '/data_asset_info/data_asset_info-list',
    label: 'Data asset info',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_DATA_ASSET_INFO',
  },
  {
    href: '/data_asset_type/data_asset_type-list',
    label: 'Data asset type',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_DATA_ASSET_TYPE',
  },
  {
    href: '/data_extract_dag/data_extract_dag-list',
    label: 'Data extract dag',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_DATA_EXTRACT_DAG',
  },
  {
    href: '/data_extract_request/data_extract_request-list',
    label: 'Data extract request',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_DATA_EXTRACT_REQUEST',
  },
  {
    href: '/data_extract_template/data_extract_template-list',
    label: 'Data extract template',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_DATA_EXTRACT_TEMPLATE',
  },
  {
    href: '/entity_info/entity_info-list',
    label: 'Entity info',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_ENTITY_INFO',
  },
  {
    href: '/integration_spec/integration_spec-list',
    label: 'Integration spec',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_INTEGRATION_SPEC',
  },
  {
    href: '/payload_field_spec/payload_field_spec-list',
    label: 'Payload field spec',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_PAYLOAD_FIELD_SPEC',
  },
  {
    href: '/payload_layout_spec/payload_layout_spec-list',
    label: 'Payload layout spec',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_PAYLOAD_LAYOUT_SPEC',
  },
  {
    href: '/payload_record_spec/payload_record_spec-list',
    label: 'Payload record spec',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_PAYLOAD_RECORD_SPEC',
  },
  {
    href: '/pipeline_spec/pipeline_spec-list',
    label: 'Pipeline spec',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_PIPELINE_SPEC',
  },
  {
    href: '/pipeline_step/pipeline_step-list',
    label: 'Pipeline step',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_PIPELINE_STEP',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

  {
    href: '/home',
    label: 'Home page',
    icon: icon.mdiHome,
    withDevider: true,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
