export const extractAuthorInitials = name => {
  return name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0);
};
