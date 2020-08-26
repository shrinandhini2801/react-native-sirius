const moment = require('moment');

moment.updateLocale('en', {
  relativeTime: {
    h: '1 hour',
    d: '1 day'
  }
});

export const formatDateForAggregation = epochDate => {
  const date = new Date(epochDate);

  const now = moment();
  const moDate = moment.utc(date);

  const diff = now.diff(moDate, 'days');

  if (diff < 7) {
    return moDate.fromNow();
  } else {
    return moDate.format('MMMM D, YYYY');
  }
};

export const formatDateforArticle = epochDate => {
  const date = new Date(epochDate);

  const moDate = moment.utc(date);

  return moDate.format('dddd, MMMM D, YYYY');
};

export const isOverOneYearOld = epochDate => {
  const date = new Date(epochDate);
  const today = new Date();

  return date.getYear() > today.getYear();
};

export const formatDateforArticleAnalytics = epochDate => {
  const date = new Date(epochDate);

  const moDate = moment.utc(date);

  return moDate.format('ddd MMMM D YYYY');
};
