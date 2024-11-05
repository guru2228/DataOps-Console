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
} from '../../stores/cli_org_entity_info/cli_org_entity_infoSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditCli_org_entity_info = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    cli_org_aide: '',

    entity_info_aide: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { cli_org_entity_info } = useAppSelector(
    (state) => state.cli_org_entity_info,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { cli_org_entity_infoId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: cli_org_entity_infoId }));
  }, [cli_org_entity_infoId]);

  useEffect(() => {
    if (typeof cli_org_entity_info === 'object') {
      setInitialValues(cli_org_entity_info);
    }
  }, [cli_org_entity_info]);

  useEffect(() => {
    if (typeof cli_org_entity_info === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = cli_org_entity_info[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [cli_org_entity_info]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: cli_org_entity_infoId, data }));
    await router.push('/cli_org_entity_info/cli_org_entity_info-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit cli_org_entity_info')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit cli_org_entity_info'}
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
              <FormField label='cli_org_aide' labelFor='cli_org_aide'>
                <Field
                  name='cli_org_aide'
                  id='cli_org_aide'
                  component={SelectField}
                  options={initialValues.cli_org_aide}
                  itemRef={'cli_org'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='entity_info_aide' labelFor='entity_info_aide'>
                <Field
                  name='entity_info_aide'
                  id='entity_info_aide'
                  component={SelectField}
                  options={initialValues.entity_info_aide}
                  itemRef={'entity_info'}
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
                    router.push('/cli_org_entity_info/cli_org_entity_info-list')
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

EditCli_org_entity_info.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CLI_ORG_ENTITY_INFO'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCli_org_entity_info;
