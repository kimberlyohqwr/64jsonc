import { AppFile, DesktopDir, Dir, LinkFile, SymlinkFile, SystemDir } from 'beans';
import wallpaper from '../components/Desktop/images/wallpaper.jpg';
import {
  AttributionWindow,
  BrowserWindow,
  FinderWindow,
  InstagramWindow,
  PaypalWindow,
  TerminalWindow,
  VersionHistoryWindow,
} from '../components/windows';
import { awards, educations, projects, workExperiences } from '../data';

class RootDir extends SystemDir {
  constructor(children) {
    super(children, 'root', null);
  }

  getUserDir(user = 'jason') {
    return this.getChild('users', user);
  }

  getDesktopDir() {
    const userDir = this.getUserDir();
    return userDir && userDir.getChild('desktop');
  }

  getAppsDir() {
    const userDir = this.getUserDir();
    return userDir && userDir.getChild('apps');
  }

  getApps() {
    const appsDir = this.getAppsDir();
    return appsDir && appsDir.children;
  }

  remove() {
    this.children = [];
  }

  get pathKeys() {
    return [];
  }

  static get instance() {
    if (this.rootDir) {
      return this.rootDir;
    }

    const attribution = new AppFile(AttributionWindow);
    const browser = new AppFile(BrowserWindow, { pinned: false });
    const finder = new AppFile(FinderWindow, { defaultUrl: '/finder/users/jason/desktop' });
    const instagram = new AppFile(InstagramWindow);
    const paypal = new AppFile(PaypalWindow);
    const terminal = new AppFile(TerminalWindow);
    const versionHistory = new AppFile(VersionHistoryWindow);

    this.rootDir = new RootDir({
      users: new SystemDir({
        jason: new SystemDir({
          apps: new SystemDir({
            finder,
            terminal,
            instagram,
            paypal,
            version_history: versionHistory,
            attribution,
            browser,
          }),
          desktop: new DesktopDir({
            projects: new Dir(projects),
            work_experience: new Dir(workExperiences),
            awards: new Dir(awards),
            education: new Dir(educations),
            terminal: new SymlinkFile(terminal),
            instagram: new SymlinkFile(instagram),
            paypal: new SymlinkFile(paypal),
            github: new LinkFile('https://github.com/parkjs814'),
            resume: new LinkFile('https://jasonpark.me/resume/'),
            email: new LinkFile('mailto:jason.park@gatech.edu'),
            version_history: new SymlinkFile(versionHistory),
            attribution: new SymlinkFile(attribution),
          }, wallpaper),
        }),
      }),
    });

    return this.rootDir;
  }
}

export default RootDir;
