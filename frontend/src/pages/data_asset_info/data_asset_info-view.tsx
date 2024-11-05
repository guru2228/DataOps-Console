import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/data_asset_info/data_asset_infoSlice';
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

const Data_asset_infoView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data_asset_info } = useAppSelector((state) => state.data_asset_info);

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
        <title>{getPageTitle('View data_asset_info')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View data_asset_info')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>aide</p>
            <p>{data_asset_info?.aide}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Contact_info aide</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>type</th>

                      <th>role</th>

                      <th>val</th>

                      <th>modified_at</th>

                      <th>modified_by</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data_asset_info.contact_info_aide &&
                      Array.isArray(data_asset_info.contact_info_aide) &&
                      data_asset_info.contact_info_aide.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/contact_info/contact_info-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='type'>{item.type}</td>

                          <td data-label='role'>{item.role}</td>

                          <td data-label='val'>{item.val}</td>

                          <td data-label='modified_at'>
                            {dataFormatter.dateTimeFormatter(item.modified_at)}
                          </td>

                          <td data-label='modified_by'>{item.modified_by}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!data_asset_info?.contact_info_aide?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Data_asset_entity_map asset_aide
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
                    {data_asset_info.data_asset_entity_map_asset_aide &&
                      Array.isArray(
                        data_asset_info.data_asset_entity_map_asset_aide,
                      ) &&
                      data_asset_info.data_asset_entity_map_asset_aide.map(
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
              {!data_asset_info?.data_asset_entity_map_asset_aide?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Data_asset_type aide</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>type</th>

                      <th>modified_at</th>

                      <th>modified_by</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data_asset_info.data_asset_type_aide &&
                      Array.isArray(data_asset_info.data_asset_type_aide) &&
                      data_asset_info.data_asset_type_aide.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/data_asset_type/data_asset_type-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='type'>{item.type}</td>

                          <td data-label='modified_at'>
                            {dataFormatter.dateTimeFormatter(item.modified_at)}
                          </td>

                          <td data-label='modified_by'>{item.modified_by}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!data_asset_info?.data_asset_type_aide?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/data_asset_info/data_asset_info-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Data_asset_infoView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_DATA_ASSET_INFO'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Data_asset_infoView;
