import { FIELD, INFO_TEXT } from './fields';
import { BOOST_FORMS } from './forms';
import { COMMON_STEPS, CONTENT } from './boosts';

const SETTING_STEPS = {
  EDIT_SPAM_FILTER: {
    STEP1: {
      type: 'boostMetaForm',
      form: {
        ...BOOST_FORMS.SPAM_FILTER,
        fields: [
          [
            {
              ...FIELD.PAYMENT_REQUEST,
              label: 'Amount in Deposit Token',
              info: INFO_TEXT.SPAM_FILTER_AMOUNT,
              hideMax: true,
            },
            {
              ...FIELD.BASIC_SWITCH,
              label: 'Spam filter active?',
              name: 'active',
            },
          ],
        ],
      },
      next: 'STEP2',
      stepLabel: 'Select Filter Parameters',
      isUserStep: true,
      start: true,
    },
    STEP2: { ...COMMON_STEPS.SIGNER, stepLabel: 'Sign', daoRefetch: true },
  },
};

export const BOOST_SETTING = {
  SPAM_FILTER: {
    id: 'SPAM_FILTER',
    steps: SETTING_STEPS.EDIT_SPAM_FILTER,
    boostContent: CONTENT.SPAM_FILTER,
    categories: ['devTools'],
    networks: 'all',
    cost: 'free',
    metaFields: ['paymentRequested', 'paymentToken', 'membersOnly', 'active'],
    settings: { type: 'internalLink', appendToDaoPath: 'settings/spam' },
  },
};
