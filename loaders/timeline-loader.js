const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');

const timelinePath = path.join(__dirname, '..', 'timeline');
const exts = {
  award: 'awards',
  edu: 'educations',
  proj: 'projects',
  work: 'workExperiences',
};

function formatDate(date) {
  return date.replace(/(\d{4})(\d{2})/g, (_, year, month) => {
    const monthAbbr = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'][month - 1];
    return `${monthAbbr} ${year}`;
  });
}

function tokenize(file) {
  const tokens = file.split('.');
  const ext = tokens.pop();
  const fileName = tokens.join('.');
  return { ext, fileName };
}

function read(filePath, options) {
  this.addDependency(filePath);
  return fs.readFileSync(filePath, options);
}

function loadImage(imagePath) {
  const content = read(imagePath);
  const outputPath = loaderUtils.interpolateName(
    { resourcePath: imagePath },
    'static/media/[name].[hash:8].[ext]',
    { content },
  );
  this.emitFile(outputPath, content);
  return outputPath;
}

module.exports = function () {
  read = read.bind(this);
  loadImage = loadImage.bind(this);

  const bioPath = path.join(timelinePath, 'current.bio');
  const bioBody = read(bioPath, 'utf8');
  const bio = JSON.parse(bioBody);
  const loaded = { bio };
  Object.values(exts).forEach(type => {
    loaded[type] = [];
  });
  const years = fs.readdirSync(timelinePath).filter(v => /^\d{4}$/.test(v)).sort((a, b) => b - a);
  years.forEach(year => {
    const yearPath = path.join(timelinePath, year);
    const months = fs.readdirSync(yearPath).filter(v => /^\d{2}$/.test(v)).sort((a, b) => b - a);

    months.forEach(month => {
      const monthPath = path.join(yearPath, month);
      const files = fs.readdirSync(monthPath);
      const dataFiles = files.filter(file => tokenize(file).ext in exts);
      const imageFiles = files.filter(file => ['jpg', 'png'].includes(tokenize(file).ext));

      dataFiles.forEach(file => {
        const filePath = path.join(monthPath, file);

        const { ext, fileName } = tokenize(file);
        const type = exts[ext];
        const fileBody = read(filePath, 'utf8');
        const start = `${year}${month}`;
        const key = `${fileName}-${start}`;

        const imageFile = imageFiles.find(file => tokenize(file).fileName === fileName);
        const imagePath = path.join(monthPath, imageFile);
        const image = loadImage(imagePath);

        const { name, current, end, ...rest } = JSON.parse(fileBody);
        const date = formatDate(start + (current || end ? ' - ' : '') + (end ? current ? `(${end})` : end : ''));
        loaded[type].push({
          key,
          name,
          date,
          image,
          ...rest,
        });
      });
    });
  });

  const json = JSON.stringify(loaded)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return `module.exports = ${json};`;
};