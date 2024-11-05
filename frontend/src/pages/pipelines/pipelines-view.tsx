import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/pipelines/pipelinesSlice';
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

const PipelinesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pipelines } = useAppSelector((state) => state.pipelines);

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
        <title>{getPageTitle('View pipelines')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View pipelines')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={pipelines?.pipeline_spec}
            />
          </FormField>

          <>
            <p className={'block font-bold mb-2'}>Steps</p>
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
                    {pipelines.steps &&
                      Array.isArray(pipelines.steps) &&
                      pipelines.steps.map((item: any) => (
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
              {!pipelines?.steps?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>client_org</p>

            <p>{pipelines?.client_org?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/pipelines/pipelines-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

PipelinesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PIPELINES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default PipelinesView;
