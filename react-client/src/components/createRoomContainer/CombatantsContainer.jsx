import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { removeUserFromNewRoom } from '../../../../redux/actions.js';

const mapStateToProps = state => {
  return {
    loggedInUser: state.username,
    usersForNewRoom: state.usersForNewRoom
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeUserFromNewRoom: (username) => dispatch(removeUserFromNewRoom(username)),
  };
};

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

function ConnectedCombatantsContainer(props) {
  const { classes } = props;
  return (
    <div>
      <Typography id="users-for-new-room-header">
        Users &ensp;<span style={{ flex: "right" }}>{props.usersForNewRoom.length}/7</span>
      </Typography>

      {/* logged in user's chip */}
      <Chip
        style={{ zIndex: '0' }}
        // avatar={
        //   <Avatar>
        //     <FaceIcon />
        //   </Avatar>
        // }
        label={props.loggedInUser}
        className={classes.chip}
      />

      {/* invited users' chips */}
      {
        props.usersForNewRoom.slice(1).map((user, i) => {
          return (
            <Chip
              style={{ zIndex: '0' }}
              // avatar={
              //   <Avatar>
              //     <FaceIcon />
              //   </Avatar>
              // }
              key={i}
              label={user}
              onDelete={props.removeUserFromNewRoom.bind(this, user)}
              className={classes.chip}
            />
          )
        })
      }
    </div>
  );
}

ConnectedCombatantsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CombatantsContainer = withStyles(styles)(ConnectedCombatantsContainer);

export default connect(mapStateToProps, mapDispatchToProps)(CombatantsContainer);