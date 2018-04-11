import React from 'react';
import { connect } from 'react-redux';

export class SettingsPage extends React.Component {
  render() {
    return (
      <div>
        Settings page
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(undefined, mapDispatchToProps)(SettingsPage);
