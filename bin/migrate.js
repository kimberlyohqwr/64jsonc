const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'src');
const dataPath = path.join(srcPath, 'data');
const timelinePath = path.join(srcPath, 'timeline');
const exts = {
  awards: 'award',
  educations: 'edu',
  projects: 'proj',
  workExperiences: 'work',
};

function parseDate(date) {
  const yearMatch = /(\d{4})/.exec(date);
  if (!yearMatch) return {};
  const year = yearMatch[1];
  const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].findIndex(m => date.includes(m));
  const month = ~monthIndex ? `${monthIndex + 1}`.padStart(2, '0') : '';
  return { year, month };
}

function sanitize(key) {
  return key.replace(/^\d{4}_/, '');
}

// Object.entries(exts).forEach(([type, ext]) => {
//   const typePath = path.join(dataPath, type);
//   const items = require(typePath);
//   items.forEach(item => {
//     const { key, date, ...body } = item;
//     const [start, end] = date.split('-').map(str => str.trim());
//     const current = end === '';
//     const { year: startYear, month: startMonth } = parseDate(start);
//     const { year: endYear, month: endMonth } = parseDate(end);
//     const dirPath = path.join(...[timelinePath, startYear, startMonth].filter(v => v !== undefined));
//     fs.mkdirSync(dirPath, { recursive: true });
//     const filePath = path.join(dirPath, `${sanitize(key)}.${ext}`);
//     const fileBody = {
//       ...body,
//       current: current || undefined,
//       end: endYear && `${endYear}${endMonth}`,
//     };
//     fs.writeFileSync(filePath, JSON.stringify(fileBody, null, 2));
//   });
// });

// const imagesPath = path.join(dataPath, 'awards', 'images');
// const images = fs.readdirSync(imagesPath).filter(f => /\.(jpg|png)$/.test(f));
// images.forEach(image => {
//   const imagePath = path.join(imagesPath, image);
//   const destPath = path.join(timelinePath, parseDate(image).year, sanitize(image));
//   fs.copyFileSync(imagePath, destPath);
// });
// console.log(images);