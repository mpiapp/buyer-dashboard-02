/* istanbul ignore file */
import crypto from 'crypto-js'

const checkDataFromLocalStorage = localStorage.getItem('_?credentials') ? localStorage.getItem('_?credentials') : null
const decriptValue  = checkDataFromLocalStorage !== null ? crypto.AES.decrypt(checkDataFromLocalStorage, `${process.env.REACT_APP_CRYPTO_SECRET}`) : null

export const userCredentials = decriptValue !== null ? JSON.parse(decriptValue.toString(crypto.enc.Utf8)) : null
