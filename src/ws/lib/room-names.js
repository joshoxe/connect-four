import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const getRoomName = () => uniqueNamesGenerator({
  dictionaries: [adjectives, colors, animals],
  style: 'capital',
  length: 3,
  separator: '',
});

export default getRoomName;