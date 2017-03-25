import { call, fork, put, select, takeLatest } from 'redux-saga/effects';

import fetch from 'utils/fetch';
import { papernetURL } from 'utils/constants';

import { TEAMS_FETCH, TEAMS_RECEIVE } from './constants';

const fetchTeams = (token) => {
  // const token = getState().user.get('token');
  if (!token) return null;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  // dispatch({ type: FECTH_PAPER });
  return fetch(`${papernetURL}/teams`, { headers });
  // .then(
  //   (response) => {
  //     const paper = response.data;
  //     return dispatch({ type: RECEIVE_PAPER, paper });
  //   },
  //   ({ json, status }) => {
  //     if (status === 404) {
  //       return dispatch({ type: NOT_FOUND_PAPER });
  //     }
  //     toastr.error('', `Could not get paper: ${json.message ? json.message : null}`);
  //     return null;
  //   }
  // );
};

export function* fetchTeamsSaga() {
  const token = yield select(state => (state.user.get('token')));
  // try catch
  const response = yield call(fetchTeams, token);
  yield put({ type: TEAMS_RECEIVE, teams: response.data });
}

export default function* sagas() {
  yield [
    fork(takeLatest, TEAMS_FETCH, fetchTeamsSaga),
  ];
}
