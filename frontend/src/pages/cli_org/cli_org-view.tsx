import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/cli_org/cli_orgSlice';
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

const Cli_orgView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cli_org } = useAppSelector((state) => state.cli_org);

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
        <title>{getPageTitle('View cli_org')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View cli_org')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>cli_org_id</p>
            <p>{cli_org?.cli_org_id}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Cli_org_admins cli_org_id</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {cli_org.cli_org_admins_cli_org_id &&
                      Array.isArray(cli_org.cli_org_admins_cli_org_id) &&
                      cli_org.cli_org_admins_cli_org_id.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/cli_org_admins/cli_org_admins-view/?id=${item.id}`,
                            )
                          }
                        ></tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!cli_org?.cli_org_admins_cli_org_id?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Cli_org_entity_info cli_org_aide
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {cli_org.cli_org_entity_info_cli_org_aide &&
                      Array.isArray(cli_org.cli_org_entity_info_cli_org_aide) &&
                      cli_org.cli_org_entity_info_cli_org_aide.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/cli_org_entity_info/cli_org_entity_info-view/?id=${item.id}`,
                              )
                            }
                          ></tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cli_org?.cli_org_entity_info_cli_org_aide?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Cli_org_grp cli_org_grp_id</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>start_dttm</th>

                      <th>end_dttm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cli_org.cli_org_grp_cli_org_grp_id &&
                      Array.isArray(cli_org.cli_org_grp_cli_org_grp_id) &&
                      cli_org.cli_org_grp_cli_org_grp_id.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/cli_org_grp/cli_org_grp-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='start_dttm'>
                            {dataFormatter.dateTimeFormatter(item.start_dttm)}
                          </td>

                          <td data-label='end_dttm'>
                            {dataFormatter.dateTimeFormatter(item.end_dttm)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!cli_org?.cli_org_grp_cli_org_grp_id?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Cli_org_grp cli_org_id</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>start_dttm</th>

                      <th>end_dttm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cli_org.cli_org_grp_cli_org_id &&
                      Array.isArray(cli_org.cli_org_grp_cli_org_id) &&
                      cli_org.cli_org_grp_cli_org_id.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/cli_org_grp/cli_org_grp-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='start_dttm'>
                            {dataFormatter.dateTimeFormatter(item.start_dttm)}
                          </td>

                          <td data-label='end_dttm'>
                            {dataFormatter.dateTimeFormatter(item.end_dttm)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!cli_org?.cli_org_grp_cli_org_id?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/cli_org/cli_org-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Cli_orgView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_CLI_ORG'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Cli_orgView;
