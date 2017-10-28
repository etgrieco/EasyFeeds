import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
  });

export const login = user => dispatch => (
  SessionApiUtil.login(user)
    .then(loggedInUser => dispatch(receiveCurrentUser(loggedInUser)),
    errors => dispatch(receiveSessionErrors(errors.responseJSON))
  )
);

export const signup = user => dispatch => (
  SessionApiUtil.signup(user)
    .then(signedUpUser => dispatch(receiveCurrentUser(signedUpUser)),
    errors => dispatch(receiveSessionErrors(errors.responseJSON)))
);

export const logout = () => {
  return (dispatch) => {
    return SessionApiUtil.logout()
      .then(() => dispatch(receiveCurrentUser(null)),
      errors => dispatch(receiveSessionErrors(errors.responseJSON))
    );
  };
};
