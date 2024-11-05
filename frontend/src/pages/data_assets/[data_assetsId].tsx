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

import { update, fetch } from '../../stores/data_assets/data_assetsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditData_assets = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    owner: '',

    client_org: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { data_assets } = useAppSelector((state) => state.data_assets);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { data_assetsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: data_assetsId }));
  }, [data_assetsId]);

  useEffect(() => {
    if (typeof data_assets === 'object') {
      setInitialValues(data_assets);
    }
  }, [data_assets]);

  useEffect(() => {
    if (typeof data_assets === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = data_assets[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [data_assets]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: data_assetsId, data }));
    await router.push('/data_assets/data_assets-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit data_assets')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit data_assets'}
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
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='Owner' labelFor='owner'>
                <Field
                  name='owner'
                  id='owner'
                  component={SelectField}
                  options={initialValues.owner}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='client_org' labelFor='client_org'>
                <Field
                  name='client_org'
                  id='client_org'
                  component={SelectField}
                  options={initialValues.client_org}
                  itemRef={'client_orgs'}
                  showField={'name'}
                ></Field>
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
                  onClick={() => router.push('/data_assets/data_assets-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditData_assets.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DATA_ASSETS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditData_assets;
