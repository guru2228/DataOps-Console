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
