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

import { update, fetch } from '../../stores/cli_org_grp/cli_org_grpSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditCli_org_grp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    cli_org_grp_id: '',

    cli_org_id: '',

    start_dttm: new Date(),

    end_dttm: new Date(),
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { cli_org_grp } = useAppSelector((state) => state.cli_org_grp);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { cli_org_grpId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: cli_org_grpId }));
  }, [cli_org_grpId]);

  useEffect(() => {
    if (typeof cli_org_grp === 'object') {
      setInitialValues(cli_org_grp);
    }
  }, [cli_org_grp]);

  useEffect(() => {
    if (typeof cli_org_grp === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = cli_org_grp[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [cli_org_grp]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: cli_org_grpId, data }));
    await router.push('/cli_org_grp/cli_org_grp-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit cli_org_grp')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit cli_org_grp'}
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
              <FormField label='cli_org_grp_id' labelFor='cli_org_grp_id'>
                <Field
                  name='cli_org_grp_id'
                  id='cli_org_grp_id'
                  component={SelectField}
                  options={initialValues.cli_org_grp_id}
                  itemRef={'cli_org'}
                  showField={'id'}
                ></Field>
              </FormField>

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

              <FormField label='start_dttm'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.start_dttm
                      ? new Date(
                          dayjs(initialValues.start_dttm).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, start_dttm: date })
                  }
                />
              </FormField>

              <FormField label='end_dttm'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.end_dttm
                      ? new Date(
                          dayjs(initialValues.end_dttm).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, end_dttm: date })
                  }
                />
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
                  onClick={() => router.push('/cli_org_grp/cli_org_grp-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditCli_org_grp.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CLI_ORG_GRP'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCli_org_grp;
