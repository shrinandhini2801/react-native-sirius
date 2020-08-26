jest.mock('react-navigation', () => ({
  withNavigation: component => component
}));

jest.mock('react-navigation-hooks', () => ({
  useNavigation: () => jest.fn(),
  useNavigationParam: jest.fn(
    jest.requireActual('react-navigation-hooks').useNavigationParam
  )
}));
