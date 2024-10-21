import { useState } from 'react';
import { NextPage } from 'next';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import moment from 'moment';
import Layout from '@/components/Layout';
import Success from '@/components/messages/Success';
import Error from '@/components/messages/Error';
import Form from '@/components/form/Form';
import SiteName from '@/components/common/SiteName';
import PageHeader from '@/components/common/PageHeader';
import SubmitButton from '@/components/form/SubmitButton';
import FormRow from '@/components/form/FormRow';
import FormHalfRow from '@/components/form/FormHalfRow';
import FormLabel from '@/components/form/FormLabel';
import FormError from '@/components/form/FormError';
import FormText from '@/components/form/FormText';
import FormGroup from '@/components/form/FormGroup';
import FormNumber from '@/components/form/FormNumber';

const Home: NextPage = () => {
  const [error, setError] = useState<string>('');
  const [done, setDone] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);

  const submitForm = async (values: any) => {
    const ADMIN_ACCOUNT = process.env.S1_ADMIN_ACCOUNT_ID;
    const ENDPOINT: any = process!.env!.S1_SITE_GENERATOR_ENDPOINT;
    const SITE_TYPE = 'Trial';
    const SKU = 'Core';
    const EXPIRED_DATE = moment().add(30, 'days').toISOString();

    setCreating(true);
    setDone(false);
    setError('');

    const { name, email, company, person, fullName, tel, totalLicenses } =
      values;
    try {
      const res = await axios.post(ENDPOINT, {
        data: {
          name,
          totalLicenses,
          unlimitedExpiration: false,
          expiration: EXPIRED_DATE,
          siteType: SITE_TYPE,
          sku: SKU,
          suite: SKU,
          accountId: ADMIN_ACCOUNT,
          user: {
            fullName,
            email,
          },
        },
        mailData: {
          to: email,
          company,
          person,
          tel,
        },
      });

      if (res?.data?.errors) {
        switch (res?.data?.errors[0].detail) {
          case 'Scope account has no licenses of type "Core"':
            setError(
              "'Core'タイプを選択できません、アカウントをご確認ください"
            );
            break;
          case `A site named "${name}"" already exists in the account`:
            setError('ご指定の希望アカウント名（英語）は既に登録されています');
            break;
          case `Email address "${email}" is already used by another user`:
            setError('ご使用のEメールアドレスは既に登録されています');
            break;
          case 'Licenses in site cannot exceed the number of licenses in account':
            setError(
              'ご希望の利用PC台数が多過ぎます。申し訳ありませんが、数を減らして再度お試しください'
            );
            break;
          default:
            setError(res?.data?.errors[0].detail);
            break;
        }
      }

      if (res?.data?.message === 'SUCCESS') {
        setDone(true);
      }
    } catch (err) {
      console.log(err);
    }

    setCreating(false);
  };

  const validation = () =>
    yup.object().shape({
      company: yup.string().required('必須入力です'),
      name: yup.string().required('必須入力です'),
      email: yup
        .string()
        .email('メールアドレスの形式で入力してください')
        .matches(/^(?!.*(gmail|hotmail)).*$/, {
          message: 'フリーメールは使用できません',
        })
        .required('必須入力です'),
      person: yup.string().required('必須入力です'),
      fullName: yup.string().required('必須入力です'),
      tel: yup.string().required('必須入力です'),
      totalLicenses: yup
        .number()
        .positive('整数値で入力してください')
        .required('必須入力です'),
    });

  const initialValues = {
    name: '',
    email: '',
    company: '',
    person: '',
    fullName: '',
    tel: '',
    totalLicenses: 10,
  };

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        validationSchema={validation()}
        onSubmit={submitForm}
      >
        {(props: any) => (
          <Form handleSubmit={props.handleSubmit}>
            <SiteName />
            <PageHeader title="トライアル申し込みフォーム" />
            {done && <Success />}
            {error && <Error error={error} />}
            <FormRow>
              <FormHalfRow>
                <FormGroup>
                  <FormLabel
                    column="company"
                    label="会社名"
                    hasError={!!props.errors.company}
                  />
                  <FormText
                    name="company"
                    value={props.values.company}
                    onChange={props.handleChange}
                    hasError={!!props.errors.company}
                  />
                  <FormError error={props.errors.company} />
                </FormGroup>
                <FormGroup>
                  <FormLabel
                    column="name"
                    label="希望アカウント名（英語）"
                    hasError={!!props.errors.name}
                  />
                  <FormText
                    name="name"
                    value={props.values.name}
                    onChange={props.handleChange}
                    hasError={!!props.errors.name}
                  />
                  <FormError error={props.errors.name} />
                </FormGroup>
                <FormGroup>
                  <FormLabel
                    column="email"
                    label="Eメールアドレス"
                    hasError={!!props.errors.email}
                  />
                  <FormText
                    name="email"
                    value={props.values.email}
                    onChange={props.handleChange}
                    hasError={!!props.errors.email}
                  />
                  <FormError error={props.errors.email} />
                </FormGroup>
                <FormGroup>
                  <FormLabel
                    column="person"
                    label="ご担当者名"
                    hasError={!!props.errors.person}
                  />
                  <FormText
                    name="person"
                    value={props.values.person}
                    onChange={props.handleChange}
                    hasError={!!props.errors.person}
                  />
                  <FormError error={props.errors.person} />
                </FormGroup>
              </FormHalfRow>
              <FormHalfRow>
                <FormGroup>
                  <FormLabel
                    column="fullName"
                    label="ご担当者名（ローマ字）"
                    hasError={!!props.errors.fullName}
                  />
                  <FormText
                    name="fullName"
                    value={props.values.fullName}
                    onChange={props.handleChange}
                    hasError={!!props.errors.fullName}
                  />
                  <FormError error={props.errors.fullName} />
                </FormGroup>
                <FormGroup>
                  <FormLabel
                    column="tel"
                    label="電話番号"
                    hasError={!!props.errors.tel}
                  />
                  <FormText
                    name="tel"
                    value={props.values.tel}
                    onChange={props.handleChange}
                    hasError={!!props.errors.tel}
                  />
                  <FormError error={props.errors.tel} />
                </FormGroup>
                <FormGroup>
                  <FormLabel
                    column="totalLicenses"
                    label="利用PC台数"
                    hasError={!!props.errors.totalLicenses}
                  />
                  <FormNumber
                    name="totalLicenses"
                    value={props.values.totalLicenses}
                    onChange={props.handleChange}
                    hasError={!!props.errors.totalLicenses}
                  />
                  <FormError error={props.errors.totalLicenses} />
                </FormGroup>
              </FormHalfRow>
            </FormRow>
            <SubmitButton creating={creating} />
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

Home.getInitialProps = async () => ({});

export default Home;
