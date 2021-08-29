/**
 * Created by pusti on 23.08.2017.
 */
import IndexApi from '../api/IndexApi';
import {getFilms} from './load.api';

const Api = new IndexApi();

const change = (API) =>
    (method, params = '') =>
        (dispatch) =>
            API[method].call(API, params)
                .then( response =>
                    new Promise( (resolve, reject)=>{
                        dispatch(getFilms());
                        resolve(response);
                    })
                )
                .catch(error => {
                    console.log("change",error);
                    dispatch({
                        type: "API_ERROR",
                        error,
                    });
                });

export const addMany = (films) => change(Api)('addMany',films);
export const addFilm = (film) => change(Api)('addFilm',film);
export const deleteFilm = (id) => change(Api)('deleteFilm',id);