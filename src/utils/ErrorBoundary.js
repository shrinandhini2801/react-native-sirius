import React from 'react';
import { View, Text } from 'react-native';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
  return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
     // TODO: Link with some error dashboards
    logErrorToMyService(error, errorInfo);
    this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) {
      return(
        <View style={{flex: 1, backgroundColor: '#454545'}}>
            <Text style={{alignItems: 'center'}}>Some error occurred!</Text>
        </View>
      )
    }

    return this.props.children;
  }
}
