import { httpWords } from './http-common';

export const getWords = () => httpWords.get('data.json');