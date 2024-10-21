import { NextPage } from 'next';
import Layout from '@/components/Layout';
import SiteName from '@/components/common/SiteName';
import PageHeader from '@/components/common/PageHeader';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  emailValidateOptions,
  emailValidateWithFreemailOptions,
} from '@/validations/email-validate-options';
import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';

type FormData = {
  name: string;
  email: string;
  company: string;
  fullName: string;
  totalLicenses: number;
  contractType: string;
  licenseType: string;
  partnerCompany: string;
  salesEmail: string;
  partnerAdminEmails: {
    email: string;
  }[];
};

const Home: NextPage = () => {
  const [showCustomerAdmin, setShowCustomerAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const toast = useToast();

  const {
    control,
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'partnerAdminEmails',
  });

  const onSubmit = async (values: FormData) => {
    setError('');
    const ADMIN_ACCOUNT = process.env.S1_ADMIN_ACCOUNT_ID;
    const ENDPOINT: any = process!.env!.S1_SITE_GENERATOR_ENDPOINT;

    const EXPIRED_DATE = moment().add(30, 'days').toISOString();

    const {
      company,
      name,
      email,
      fullName,
      contractType,
      licenseType,
      totalLicenses,
      partnerCompany,
      salesEmail,
      partnerAdminEmails,
    } = values;

    const isCustomerAdminNeeded = !!(email && fullName);
    const isPartnerAdminNeeded = partnerAdminEmails.length > 0;
    const isPaidType = contractType === 'Paid';
    const salesDomain = salesEmail.split('@')[1];
    const SITE_TYPE = 'Trial';
    const SKU = licenseType;

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
          description: salesDomain,
          user: {
            fullName,
            email,
          },
        },
        dataWithoutAdmin: {
          name,
          totalLicenses,
          unlimitedExpiration: false,
          expiration: EXPIRED_DATE,
          siteType: SITE_TYPE,
          sku: SKU,
          suite: SKU,
          accountId: ADMIN_ACCOUNT,
          description: salesDomain,
        },
        mailData: {
          to: salesEmail,
          company,
        },
        meta: {
          isCustomerAdminNeeded,
          isPartnerAdminNeeded,
          salesDomain,
          partnerCompany,
          partnerAdminEmails,
          isPaidType,
        },
      });

      if (res.status === 200) {
        toast({
          title: 'サイト作成完了',
          description: 'サイトが正常に作成されました',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });

        reset();
      }
    } catch (err: any) {
      const msg = err?.response?.data?.errors?.[0]?.detail;

      if (msg && msg.includes('already exists')) {
        setError('ご指定のサイト名（英語）は既に登録されています');
      }

      if (
        msg &&
        msg ===
          'You selected a Site user. You must select an Account user to get access to the requested scope.'
      ) {
        setError(
          'サイトユーザは選択できません。アカウントユーザを選択してください'
        );
      }
    }
  };

  return (
    <Layout>
      <SiteName />
      <PageHeader title="代理店向け サイト作成フォーム" />
      {error && (
        <Alert status="error" mb={8}>
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      <Stack
        as="form"
        color="white"
        onSubmit={handleSubmit(onSubmit)}
        w="full"
        align="start"
        spacing={8}
      >
        <Stack w="full" spacing={12}>
          <Stack as="section" spacing={8}>
            <Heading fontSize={24} fontWeight="normal">
              エンドユーザ情報
            </Heading>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              w="full"
              spacing={6}
            >
              <Stack w={{ base: '100%', md: '50%' }} spacing={6}>
                <FormControl isInvalid={!!errors.company}>
                  <FormLabel htmlFor="company">エンドユーザ企業名</FormLabel>
                  <Input
                    id="company"
                    placeholder="エンドユーザ企業名"
                    {...register('company', {
                      required: '必須入力です',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.company && errors.company.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel htmlFor="name">サイト名（英語）</FormLabel>
                  <Input
                    id="name"
                    placeholder="サイト名（英語）"
                    {...register('name', {
                      required: '必須入力です',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="email-alerts" mb="0">
                    エンドユーザ管理者を追加しますか？
                  </FormLabel>
                  <Switch
                    size="lg"
                    id="email-alerts"
                    onChange={(e) => {
                      setShowCustomerAdmin(e.target.checked);
                      resetField('email');
                      resetField('fullName');
                    }}
                  />
                </FormControl>
                {showCustomerAdmin && (
                  <>
                    <FormControl isInvalid={!!errors.email}>
                      <FormLabel htmlFor="email">Eメールアドレス</FormLabel>
                      <Input
                        id="email"
                        placeholder="Eメールアドレス"
                        {...register('email', emailValidateOptions)}
                      />
                      <FormErrorMessage>
                        {errors.email && errors.email.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.fullName}>
                      <FormLabel htmlFor="fullName">
                        エンドユーザ管理者氏名
                      </FormLabel>
                      <Input
                        id="fullName"
                        placeholder="エンドユーザ管理者氏名"
                        {...register('fullName', {
                          required: '必須入力です',
                        })}
                      />
                      <FormErrorMessage>
                        {errors.fullName && errors.fullName.message}
                      </FormErrorMessage>
                    </FormControl>
                  </>
                )}
              </Stack>
              <Stack w={{ base: '100%', md: '50%' }} spacing={6}>
                <FormControl isInvalid={!!errors.contractType}>
                  <FormLabel htmlFor="contractType">サイト作成種別</FormLabel>
                  <Select
                    {...register('contractType', {
                      required: '必須入力です',
                    })}
                  >
                    <option value="Trial" style={{ color: '#444' }}>
                      トライアル
                    </option>
                    <option value="Paid" style={{ color: '#444' }}>
                      本番
                    </option>
                  </Select>
                  <FormErrorMessage>
                    {errors.contractType && errors.contractType.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.licenseType}>
                  <FormLabel htmlFor="licenseType">ライセンス種別</FormLabel>
                  <Select
                    {...register('licenseType', {
                      required: '必須入力です',
                    })}
                    colorScheme="whiteAlpha"
                  >
                    <option value="Core" style={{ color: '#444' }}>
                      Core
                    </option>
                    <option value="Control" style={{ color: '#444' }}>
                      Control
                    </option>
                    <option value="Complete" style={{ color: '#444' }}>
                      Complete
                    </option>
                  </Select>
                  <FormErrorMessage>
                    {errors.licenseType && errors.licenseType.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.totalLicenses}>
                  <FormLabel htmlFor="totalLicenses">
                    申し込みライセンス数（サーバ+PC合計）
                  </FormLabel>
                  <Input
                    id="totalLicenses"
                    type="number"
                    placeholder="申し込みライセンス数（サーバ+PC合計）"
                    {...register('totalLicenses', {
                      required: '必須入力です',
                      valueAsNumber: true,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.totalLicenses && errors.totalLicenses.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <Stack as="section" spacing={8}>
            <Heading fontSize={24} fontWeight="normal">
              パートナー情報
            </Heading>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              w="full"
              spacing={6}
            >
              <Stack w={{ base: '100%', md: '50%' }} spacing={6}>
                <FormControl isInvalid={!!errors.partnerCompany}>
                  <FormLabel htmlFor="partnerCompany">
                    パートナー企業名
                  </FormLabel>
                  <Input
                    id="partnerCompany"
                    placeholder="パートナー企業名"
                    {...register('partnerCompany', {
                      required: '必須入力です',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.partnerCompany && errors.partnerCompany.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.salesEmail}>
                  <FormLabel htmlFor="salesEmail">
                    申請者メールアドレス
                  </FormLabel>
                  <Input
                    id="salesEmail"
                    placeholder="申請者メールアドレス"
                    {...register(
                      'salesEmail',
                      emailValidateWithFreemailOptions
                    )}
                  />
                  <FormErrorMessage>
                    {errors.salesEmail && errors.salesEmail.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack w={{ base: '100%', md: '50%' }} spacing={6} align="start">
                <Heading fontSize={16} fontWeight="normal">
                  パートナー管理者メールアドレス
                </Heading>
                {fields.map((item, index) => (
                  <FormControl
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    isInvalid={
                      !!(errors.partnerAdminEmails?.[index] as any)?.email
                    }
                  >
                    <Stack direction="row">
                      <Input
                        id="partnerCompany"
                        placeholder={`メールアドレス${index + 1}`}
                        {...register(
                          `partnerAdminEmails.${index}.email`,
                          emailValidateOptions
                        )}
                      />
                      <Button
                        type="button"
                        colorScheme="pink"
                        onClick={() => remove(index)}
                      >
                        削除
                      </Button>
                    </Stack>

                    <FormErrorMessage>
                      {(errors.partnerAdminEmails?.[index] as any)?.email &&
                        (errors.partnerAdminEmails?.[index] as any)?.email
                          .message}
                    </FormErrorMessage>
                  </FormControl>
                ))}
                <Button
                  type="button"
                  colorScheme="teal"
                  onClick={() => append({ email: '' })}
                >
                  管理者メールアドレス追加
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          サイト作成リクエストを送信
        </Button>
      </Stack>
    </Layout>
  );
};

Home.getInitialProps = async () => ({});

export default Home;
