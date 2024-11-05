import * as icon from '@mdi/js';
import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import type { ReactElement } from 'react';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/SectionMain';
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton';
import BaseIcon from '../components/BaseIcon';
import { getPageTitle } from '../config';
import Link from 'next/link';

import { hasPermission } from '../helpers/userPermissions';
import { fetchWidgets } from '../stores/roles/rolesSlice';
import { WidgetCreator } from '../components/WidgetCreator/WidgetCreator';
import { SmartWidget } from '../components/SmartWidget/SmartWidget';

import { useAppDispatch, useAppSelector } from '../stores/hooks';
const Dashboard = () => {
  const dispatch = useAppDispatch();
  const iconsColor = useAppSelector((state) => state.style.iconsColor);
  const corners = useAppSelector((state) => state.style.corners);
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);

  const [users, setUsers] = React.useState('Loading...');
  const [connectors, setConnectors] = React.useState('Loading...');
  const [data_assets, setData_assets] = React.useState('Loading...');
  const [integrations, setIntegrations] = React.useState('Loading...');
  const [pipeline_steps, setPipeline_steps] = React.useState('Loading...');
  const [pipelines, setPipelines] = React.useState('Loading...');
  const [roles, setRoles] = React.useState('Loading...');
  const [permissions, setPermissions] = React.useState('Loading...');
  const [client_orgs, setClient_orgs] = React.useState('Loading...');
  const [users, setUsers] = React.useState('Loading...');
  const [cli_org, setCli_org] = React.useState('Loading...');
  const [cli_org_admins, setCli_org_admins] = React.useState('Loading...');
  const [cli_org_entity_info, setCli_org_entity_info] =
    React.useState('Loading...');
  const [cli_org_grp, setCli_org_grp] = React.useState('Loading...');
  const [connection_spec, setConnection_spec] = React.useState('Loading...');
  const [contact_info, setContact_info] = React.useState('Loading...');
  const [data_asset_entity_map, setData_asset_entity_map] =
    React.useState('Loading...');
  const [data_asset_info, setData_asset_info] = React.useState('Loading...');
  const [data_asset_type, setData_asset_type] = React.useState('Loading...');
  const [data_extract_dag, setData_extract_dag] = React.useState('Loading...');
  const [data_extract_request, setData_extract_request] =
    React.useState('Loading...');
  const [data_extract_template, setData_extract_template] =
    React.useState('Loading...');
  const [entity_info, setEntity_info] = React.useState('Loading...');
  const [integration_spec, setIntegration_spec] = React.useState('Loading...');
  const [payload_field_spec, setPayload_field_spec] =
    React.useState('Loading...');
  const [payload_layout_spec, setPayload_layout_spec] =
    React.useState('Loading...');
  const [payload_record_spec, setPayload_record_spec] =
    React.useState('Loading...');
  const [pipeline_spec, setPipeline_spec] = React.useState('Loading...');
  const [pipeline_step, setPipeline_step] = React.useState('Loading...');

  const [widgetsRole, setWidgetsRole] = React.useState({
    role: { value: '', label: '' },
  });
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isFetchingQuery } = useAppSelector((state) => state.openAi);

  const { rolesWidgets, loading } = useAppSelector((state) => state.roles);

  const organizationId = currentUser?.organization?.id;

  async function loadData() {
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
      'users',
      'cli_org',
      'cli_org_admins',
      'cli_org_entity_info',
      'cli_org_grp',
      'connection_spec',
      'contact_info',
      'data_asset_entity_map',
      'data_asset_info',
      'data_asset_type',
      'data_extract_dag',
      'data_extract_request',
      'data_extract_template',
      'entity_info',
      'integration_spec',
      'payload_field_spec',
      'payload_layout_spec',
      'payload_record_spec',
      'pipeline_spec',
      'pipeline_step',
    ];
    const fns = [
      setUsers,
      setConnectors,
      setData_assets,
      setIntegrations,
      setPipeline_steps,
      setPipelines,
      setRoles,
      setPermissions,
      setClient_orgs,
      setUsers,
      setCli_org,
      setCli_org_admins,
      setCli_org_entity_info,
      setCli_org_grp,
      setConnection_spec,
      setContact_info,
      setData_asset_entity_map,
      setData_asset_info,
      setData_asset_type,
      setData_extract_dag,
      setData_extract_request,
      setData_extract_template,
      setEntity_info,
      setIntegration_spec,
      setPayload_field_spec,
      setPayload_layout_spec,
      setPayload_record_spec,
      setPipeline_spec,
      setPipeline_step,
    ];

    const requests = entities.map((entity, index) => {
      if (hasPermission(currentUser, `READ_${entity.toUpperCase()}`)) {
        return axios.get(`/${entity.toLowerCase()}/count`, {
          params: {
            organization: organizationId,
          },
        });
      } else {
        fns[index](null);
        return Promise.resolve({ data: { count: null } });
      }
    });

    Promise.allSettled(requests).then((results) => {
      results.forEach((result, i) => {
        if (result.status === 'fulfilled') {
          fns[i](result.value.data.count);
        } else {
          fns[i](result.reason.message);
        }
      });
    });
  }

  async function getWidgets(roleId) {
    await dispatch(fetchWidgets(roleId));
  }
  React.useEffect(() => {
    if (!currentUser) return;
    loadData().then();
    setWidgetsRole({
      role: {
        value: currentUser?.app_role?.id,
        label: currentUser?.app_role?.name,
      },
    });
  }, [currentUser]);

  React.useEffect(() => {
    if (!currentUser || !widgetsRole?.role?.value) return;
    getWidgets(widgetsRole?.role?.value || '').then();
  }, [widgetsRole?.role?.value]);

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={icon.mdiChartTimelineVariant}
          title='Overview'
          main
        >
          {''}
        </SectionTitleLineWithButton>

        {hasPermission(currentUser, 'CREATE_ROLES') && (
          <WidgetCreator
            currentUser={currentUser}
            isFetchingQuery={isFetchingQuery}
            setWidgetsRole={setWidgetsRole}
            widgetsRole={widgetsRole}
          />
        )}
        {!!rolesWidgets.length &&
          hasPermission(currentUser, 'CREATE_ROLES') && (
            <p className='  text-gray-500 dark:text-gray-400 mb-4'>
              {`${widgetsRole?.role?.label || 'Users'}'s widgets`}
            </p>
          )}

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6 grid-flow-dense'>
          {(isFetchingQuery || loading) && (
            <div
              className={` ${
                corners !== 'rounded-full' ? corners : 'rounded-3xl'
              } dark:bg-dark-900 text-lg leading-tight   text-gray-500 flex items-center ${cardsStyle} dark:border-dark-700 p-6`}
            >
              <BaseIcon
                className={`${iconsColor} animate-spin mr-5`}
                w='w-16'
                h='h-16'
                size={48}
                path={icon.mdiLoading}
              />{' '}
              Loading widgets...
            </div>
          )}

          {rolesWidgets &&
            rolesWidgets.map((widget) => (
              <SmartWidget
                key={widget.id}
                userId={currentUser?.id}
                widget={widget}
                roleId={widgetsRole?.role?.value || ''}
                admin={hasPermission(currentUser, 'CREATE_ROLES')}
              />
            ))}
        </div>

        {!!rolesWidgets.length && <hr className='my-6  ' />}

        <div
          id='dashboard'
          className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'
        >
          {hasPermission(currentUser, 'READ_USERS') && (
            <Link href={'/users/users-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Users
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {users}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiAccountGroup || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_CONNECTORS') && (
            <Link href={'/connectors/connectors-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Connectors
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {connectors}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiPlug || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_DATA_ASSETS') && (
            <Link href={'/data_assets/data_assets-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Data assets
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {data_assets}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiDatabase || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_INTEGRATIONS') && (
            <Link href={'/integrations/integrations-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Integrations
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {integrations}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiLink || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PIPELINE_STEPS') && (
            <Link href={'/pipeline_steps/pipeline_steps-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Pipeline steps
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {pipeline_steps}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiStepForward || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PIPELINES') && (
            <Link href={'/pipelines/pipelines-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Pipelines
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {pipelines}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiPipe || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_ROLES') && (
            <Link href={'/roles/roles-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Roles
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {roles}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        icon.mdiShieldAccountVariantOutline || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PERMISSIONS') && (
            <Link href={'/permissions/permissions-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Permissions
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {permissions}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiShieldAccountOutline || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_CLIENT_ORGS') && (
            <Link href={'/client_orgs/client_orgs-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Client orgs
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {client_orgs}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_USERS') && (
            <Link href={'/users/users-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Users
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {users}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiAccountGroup || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_CLI_ORG') && (
            <Link href={'/cli_org/cli_org-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Cli org
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {cli_org}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_CLI_ORG_ADMINS') && (
            <Link href={'/cli_org_admins/cli_org_admins-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Cli org admins
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {cli_org_admins}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_CLI_ORG_ENTITY_INFO') && (
            <Link href={'/cli_org_entity_info/cli_org_entity_info-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Cli org entity info
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {cli_org_entity_info}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_CLI_ORG_GRP') && (
            <Link href={'/cli_org_grp/cli_org_grp-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Cli org grp
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {cli_org_grp}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_CONNECTION_SPEC') && (
            <Link href={'/connection_spec/connection_spec-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Connection spec
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {connection_spec}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_CONTACT_INFO') && (
            <Link href={'/contact_info/contact_info-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Contact info
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {contact_info}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_DATA_ASSET_ENTITY_MAP') && (
            <Link href={'/data_asset_entity_map/data_asset_entity_map-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Data asset entity map
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {data_asset_entity_map}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_DATA_ASSET_INFO') && (
            <Link href={'/data_asset_info/data_asset_info-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Data asset info
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {data_asset_info}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_DATA_ASSET_TYPE') && (
            <Link href={'/data_asset_type/data_asset_type-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Data asset type
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {data_asset_type}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_DATA_EXTRACT_DAG') && (
            <Link href={'/data_extract_dag/data_extract_dag-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Data extract dag
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {data_extract_dag}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_DATA_EXTRACT_REQUEST') && (
            <Link href={'/data_extract_request/data_extract_request-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Data extract request
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {data_extract_request}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_DATA_EXTRACT_TEMPLATE') && (
            <Link href={'/data_extract_template/data_extract_template-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Data extract template
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {data_extract_template}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_ENTITY_INFO') && (
            <Link href={'/entity_info/entity_info-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Entity info
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {entity_info}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_INTEGRATION_SPEC') && (
            <Link href={'/integration_spec/integration_spec-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Integration spec
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {integration_spec}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PAYLOAD_FIELD_SPEC') && (
            <Link href={'/payload_field_spec/payload_field_spec-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Payload field spec
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {payload_field_spec}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PAYLOAD_LAYOUT_SPEC') && (
            <Link href={'/payload_layout_spec/payload_layout_spec-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Payload layout spec
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {payload_layout_spec}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PAYLOAD_RECORD_SPEC') && (
            <Link href={'/payload_record_spec/payload_record_spec-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Payload record spec
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {payload_record_spec}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PIPELINE_SPEC') && (
            <Link href={'/pipeline_spec/pipeline_spec-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Pipeline spec
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {pipeline_spec}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PIPELINE_STEP') && (
            <Link href={'/pipeline_step/pipeline_step-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      Pipeline step
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {pipeline_step}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </SectionMain>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
