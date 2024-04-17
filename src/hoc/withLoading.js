import React from "react";

const withLoading = (WrappedComponent) => {
  return class WithLoading extends React.Component {
    state = {
      isLoading: true,
    };

    componentDidMount() {
      setTimeout(() => {
        this.setState({
          isLoading: false,
        });
      }, 1000);
    }
    render() {
      const { isLoading } = this.state;
      return (
        <div>
          {isLoading && <div>Loading...</div>}
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default withLoading;
