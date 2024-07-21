import { Animal } from '../types';

export const downloadCSV = (items: Animal[]) => {
  const headers = ['UID', 'Name', 'Description'];
  const rows = items.map((item) => {
    const descriptions: string[] = [];
    if (item.earthAnimal) descriptions.push('Earth Animal');
    if (item.earthInsect) descriptions.push('Earth Insect');
    if (item.avian) descriptions.push('Avian');
    if (item.canine) descriptions.push('Canine');
    if (item.feline) descriptions.push('Feline');

    if (descriptions.length === 0) {
      descriptions.push('an infinitely cute animal');
    }

    return [item.uid, item.name, descriptions.join(', ')];
  });

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers, ...rows].map((e) => e.join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${items.length}_animals.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// import { Animal } from '../types';

// export const downloadCSV = (items: Animal[]) => {
//   const headers = ['UID', 'Name', 'Description'];
//   const rows = items.map((item) => [
//     item.uid,
//     item.name,
//     // item.descriptions?.join(', ') || '',
//     const descriptions: string[] = [];
//     if (item.earthAnimal) descriptions.push('Earth Animal');
//     if (item.earthInsect) descriptions.push('Earth Insect');
//     if (item.avian) descriptions.push('Avian');
//     if (item.canine) descriptions.push('Canine');
//     if (item.feline) descriptions.push('Feline');

//     if (descriptions.length === 0) {
//       descriptions.push('an infinitely cute animal');
//     }
//   ]);

//   const csvContent =
//     'data:text/csv;charset=utf-8,' +
//     [headers, ...rows].map((e) => e.join(',')).join('\n');

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement('a');
//   link.setAttribute('href', encodedUri);
//   link.setAttribute('download', `${items.length}_animals.csv`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
