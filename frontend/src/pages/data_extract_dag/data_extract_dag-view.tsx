import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/data_extract_dag/data_extract_dagSlice';
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

const Data_extract_dagView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data_extract_dag } = useAppSelector(
    (state) => state.data_extract_dag,
  );

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
        <title>{getPageTitle('View data_extract_dag')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View data_extract_dag')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>integratio_spec_id</p>
            <p>{data_extract_dag?.integratio_spec_id || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>dag_pipeline</p>
            <p>{data_extract_dag?.dag_pipeline}</p>
          </div>

          <FormField label='modified_at'>
            {data_extract_dag.modified_at ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  data_extract_dag.modified_at
                    ? new Date(
                        dayjs(data_extract_dag.modified_at).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No modified_at</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>modified_by</p>
            <p>{data_extract_dag?.modified_by}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>
              Data_extract_template integratio_spec_id
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>asset_aide</th>

                      <th>entity_aide</th>

                      <th>form_template_id</th>

                      <th>form_template</th>

                      <th>modified_at</th>

                      <th>modified_by</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data_extract_dag.data_extract_template_integratio_spec_id &&
                      Array.isArray(
                        data_extract_dag.data_extract_template_integratio_spec_id,
                      ) &&
                      data_extract_dag.data_extract_template_integratio_spec_id.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/data_extract_template/data_extract_template-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='asset_aide'>{item.asset_aide}</td>

                            <td data-label='entity_aide'>{item.entity_aide}</td>

                            <td data-label='form_template_id'>
                              {item.form_template_id}
                            </td>

                            <td data-label='form_template'>
                              {item.form_template}
                            </td>

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
              {!data_extract_dag?.data_extract_template_integratio_spec_id
                ?.length && <div className={'text-center py-4'}>No data</div>}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/data_extract_dag/data_extract_dag-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Data_extract_dagView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_DATA_EXTRACT_DAG'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Data_extract_dagView;
