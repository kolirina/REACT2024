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

  const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${items.length}_animals.csv`;

  link.click();
  URL.revokeObjectURL(url);
};
