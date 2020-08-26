/*
  Author: @jsworyk
  Description: Declare an array of trust labels that are acceptable for a given condition,
  if the array contains the trust label passed as an argument to the displayTrustLabel function return true and
  show the disclaimer label. Otherwise, the default response is false and the disclaimer is hidden.
*/
export const TRUST_LABEL_TYPES = {
  ADVERTISEMENT: 'advertisement',
  ADVICE: 'advice',
  ANALYSIS: 'analysis',
  EDITORIAL: 'editorial',
  EXPLAINER: 'explainer',
  FACT_CHECK: 'fact_check',
  FIRST_PERSON: 'first_person',
  INVESTIGATION: 'investigation',
  OPINION: 'opinion',
  REVIEW: 'review',
  SPONSORED: 'sponsored',
  SUPPORTED: 'supported'
};
// declare other groupings of labels here
let advertisementLabels = [
  TRUST_LABEL_TYPES.SPONSORED,
  TRUST_LABEL_TYPES.ADVERTISEMENT,
  TRUST_LABEL_TYPES.SUPPORTED
];
export const displayTrustLabel = (label, type) => {
  switch (type.toLowerCase()) {
    case TRUST_LABEL_TYPES.ADVERTISEMENT:
      if (advertisementLabels.includes(label.toLowerCase())) {
        return displayTrustLabel;
      }
      break;
  }
  return false;
};
