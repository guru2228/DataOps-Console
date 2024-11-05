import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/data_asset_entity_map/data_asset_entity_mapSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditData_asset_entity_mapPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    asset_aide: '',

    entity_aide: '',

    modified_at: new Date(),

    modified_by: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { data_asset_entity_map } = useAppSelector(
    (state) => state.data_asset_entity_map,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof data_asset_entity_map === 'object') {
      setInitialValues(data_asset_entity_map);
    }
  }, [data_asset_entity_map]);

  useEffect(() => {
    if (typeof data_asset_entity_map === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = data_asset_entity_map[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [data_asset_entity_map]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/data_asset_entity_map/data_asset_entity_map-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit data_asset_entity_map')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit data_asset_entity_map'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='asset_aide' labelFor='asset_aide'>
                <Field
                  name='asset_aide'
                  id='asset_aide'
                  component={SelectField}
                  options={initialValues.asset_aide}
                  itemRef={'data_asset_info'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='entity_aide' labelFor='entity_aide'>
                <Field
                  name='entity_aide'
                  id='entity_aide'
                  component={SelectField}
                  options={initialValues.entity_aide}
                  itemRef={'entity_info'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='modified_at'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.modified_at
                      ? new Date(
                          dayjs(initialValues.modified_at).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, modified_at: date })
                  }
                />
              </FormField>

              <FormField label='modified_by'>
                <Field name='modified_by' placeholder='modified_by' />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push(
                      '/data_asset_entity_map/data_asset_entity_map-list',
                    )
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditData_asset_entity_mapPage.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DATA_ASSET_ENTITY_MAP'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditData_asset_entity_mapPage;
