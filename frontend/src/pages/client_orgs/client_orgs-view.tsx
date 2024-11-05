import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/client_orgs/client_orgsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const Client_orgsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { client_orgs } = useAppSelector((state) => state.client_orgs);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View client_orgs')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View client_orgs')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{client_orgs?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Client_orgs</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client_orgs.users_client_org &&
                      Array.isArray(client_orgs.users_client_org) &&
                      client_orgs.users_client_org.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!client_orgs?.users_client_org?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Connectors client_org</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ConnectorSpec</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client_orgs.connectors_client_org &&
                      Array.isArray(client_orgs.connectors_client_org) &&
                      client_orgs.connectors_client_org.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/connectors/connectors-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='connector_spec'>
                            {item.connector_spec}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!client_orgs?.connectors_client_org?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Data_assets client_org</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client_orgs.data_assets_client_org &&
                      Array.isArray(client_orgs.data_assets_client_org) &&
                      client_orgs.data_assets_client_org.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/data_assets/data_assets-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!client_orgs?.data_assets_client_org?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Integrations client_org</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>IntegrationName</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client_orgs.integrations_client_org &&
                      Array.isArray(client_orgs.integrations_client_org) &&
                      client_orgs.integrations_client_org.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/integrations/integrations-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='integration_name'>
                            {item.integration_name}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!client_orgs?.integrations_client_org?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Pipeline_steps client_org</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>StepName</th>

                      <th>StepType</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client_orgs.pipeline_steps_client_org &&
                      Array.isArray(client_orgs.pipeline_steps_client_org) &&
                      client_orgs.pipeline_steps_client_org.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/pipeline_steps/pipeline_steps-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='step_name'>{item.step_name}</td>

                          <td data-label='step_type'>{item.step_type}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!client_orgs?.pipeline_steps_client_org?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Pipelines client_org</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>PipelineSpec</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client_orgs.pipelines_client_org &&
                      Array.isArray(client_orgs.pipelines_client_org) &&
                      client_orgs.pipelines_client_org.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/pipelines/pipelines-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='pipeline_spec'>
                            {item.pipeline_spec}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!client_orgs?.pipelines_client_org?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/client_orgs/client_orgs-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Client_orgsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_CLIENT_ORGS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Client_orgsView;
