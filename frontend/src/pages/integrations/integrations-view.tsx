import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/integrations/integrationsSlice';
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

const IntegrationsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { integrations } = useAppSelector((state) => state.integrations);

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
        <title>{getPageTitle('View integrations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View integrations')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>IntegrationName</p>
            <p>{integrations?.integration_name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Connectors</p>
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
                    {integrations.connectors &&
                      Array.isArray(integrations.connectors) &&
                      integrations.connectors.map((item: any) => (
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
              {!integrations?.connectors?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Pipelines</p>
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
                    {integrations.pipelines &&
                      Array.isArray(integrations.pipelines) &&
                      integrations.pipelines.map((item: any) => (
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
              {!integrations?.pipelines?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>client_org</p>

            <p>{integrations?.client_org?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/integrations/integrations-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

IntegrationsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_INTEGRATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default IntegrationsView;
