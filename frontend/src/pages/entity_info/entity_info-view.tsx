import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/entity_info/entity_infoSlice';
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

const Entity_infoView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { entity_info } = useAppSelector((state) => state.entity_info);

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
        <title>{getPageTitle('View entity_info')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View entity_info')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>aide</p>
            <p>{entity_info?.aide}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>
              Cli_org_entity_info entity_info_aide
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
                    {entity_info.cli_org_entity_info_entity_info_aide &&
                      Array.isArray(
                        entity_info.cli_org_entity_info_entity_info_aide,
                      ) &&
                      entity_info.cli_org_entity_info_entity_info_aide.map(
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
              {!entity_info?.cli_org_entity_info_entity_info_aide?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Data_asset_entity_map entity_aide
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>modified_at</th>

                      <th>modified_by</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entity_info.data_asset_entity_map_entity_aide &&
                      Array.isArray(
                        entity_info.data_asset_entity_map_entity_aide,
                      ) &&
                      entity_info.data_asset_entity_map_entity_aide.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/data_asset_entity_map/data_asset_entity_map-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='modified_at'>
                              {dataFormatter.dateTimeFormatter(
                                item.modified_at,
                              )}
                            </td>

                            <td data-label='modified_by'>{item.modified_by}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!entity_info?.data_asset_entity_map_entity_aide?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/entity_info/entity_info-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Entity_infoView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ENTITY_INFO'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Entity_infoView;
