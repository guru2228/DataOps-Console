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

import { update, fetch } from '../../stores/cli_org_admins/cli_org_adminsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditCli_org_adminsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    cli_org_id: '',

    user_id: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { cli_org_admins } = useAppSelector((state) => state.cli_org_admins);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof cli_org_admins === 'object') {
      setInitialValues(cli_org_admins);
    }
  }, [cli_org_admins]);

  useEffect(() => {
    if (typeof cli_org_admins === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = cli_org_admins[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [cli_org_admins]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/cli_org_admins/cli_org_admins-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit cli_org_admins')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit cli_org_admins'}
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
              <FormField label='cli_org_id' labelFor='cli_org_id'>
                <Field
                  name='cli_org_id'
                  id='cli_org_id'
                  component={SelectField}
                  options={initialValues.cli_org_id}
                  itemRef={'cli_org'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='user_id' labelFor='user_id'>
                <Field
                  name='user_id'
                  id='user_id'
                  component={SelectField}
                  options={initialValues.user_id}
                  itemRef={'users'}
                  showField={'firstName'}
                  showField={'id'}
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
                  onClick={() =>
                    router.push('/cli_org_admins/cli_org_admins-list')
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

EditCli_org_adminsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CLI_ORG_ADMINS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCli_org_adminsPage;
