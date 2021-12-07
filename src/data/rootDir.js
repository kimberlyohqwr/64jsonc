import projects from 'data/projects';
import workExperiences from 'data/workExperiences';
import awards from 'data/awards';
import educations from 'data/educations';
import { namize } from 'common/utils';

class Directory {
  constructor(children = {}, __meta__ = {}) {
    this.__meta__ = __meta__;
    if (Array.isArray(children)) {
      children.forEach(child => {
        const { key, ...content } = child;
        this[key] = new File(content);
      });
    } else {
      Object.assign(this, children);
    }
    this.getChildrenKeys().forEach(childKey => {
      this[childKey].__meta__.key = childKey;
    });
  }

  getMeta(key) {
    const meta = this.__meta__;
    return key ? meta[key] : meta;
  }

  getChildrenKeys() {
    return Object.keys(this).filter(key => this[key] instanceof Directory);
  }

  isDir() {
    return this.getChildrenKeys().length > 0;
  }

  getChild = (...directoryKeys) => {
    let directory = this;
    for (const directoryKey of directoryKeys) {
      if (!(directory[directoryKey] instanceof Directory)) return undefined;
      directory = directory[directoryKey];
    }
    return directory;
  };

  get key() {
    return this.getMeta('key');
  }

  get name() {
    return namize(this.key);
  }

  get iconProps() {
    return { iconKey: 'finder' };
  }
}

export class SystemDirectory extends Directory {
}

export class File extends Directory {
  constructor(content) {
    super(undefined, { content });
  }

  get content() {
    return this.getMeta('content');
  }

  get name() {
    return this.content.name;
  }

  get iconProps() {
    return { imageUrl: this.content.image };
  }
}

class Window extends Directory {
  constructor(windowKey, children) {
    super(children, { windowKey });
  }

  get windowKey() {
    return this.getMeta('windowKey');
  }

  get iconProps() {
    return { iconKey: this.windowKey };
  }
}

export class Link extends Directory {
  constructor(href) {
    super(undefined, { href });
  }

  get href() {
    return this.getMeta('href');
  }

  get name() {
    return namize(this.key);
  }

  get iconProps() {
    return { iconKey: this.key };
  }
}

const rootDir = new Directory({
  users: new SystemDirectory({
    jason: new SystemDirectory({
      desktop: new SystemDirectory({
        projects: new Window('finder', projects),
        work_experience: new Window('finder', workExperiences),
        awards: new Window('finder', awards),
        education: new Window('finder', educations),
        terminal: new Window('terminal'),
        instagram: new Window('instagram'),
        paypal: new Window('paypal', {
          success: new File(),
        }),
        github: new Link('https://github.com/parkjs814'),
        resume: new Link('https://jasonpark.me/resume/'),
        email: new Link('mailto:jason.park@gatech.edu'),
        version_history: new Window('version_history'),
        attribution: new Window('attribution'),
      }),
    }),
  }),
});

console.log(rootDir);

export default rootDir;
