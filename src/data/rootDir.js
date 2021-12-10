import projects from 'data/projects';
import workExperiences from 'data/workExperiences';
import awards from 'data/awards';
import educations from 'data/educations';
import wallpaper from 'components/Desktop/images/wallpaper.jpg';
import {
  AttributionWindow,
  BrowserWindow,
  FinderWindow,
  InstagramWindow,
  PaypalWindow,
  TerminalWindow,
} from 'components/windows';
import { AppFile, DesktopDir, Dir, LinkFile, RootDir, SymlinkFile, SystemDir } from 'beans';

const attribution = new AppFile(AttributionWindow);
const browser = new AppFile(BrowserWindow, { pinned: false });
const finder = new AppFile(FinderWindow, { defaultUrl: '/finder/users/jason/desktop' });
const instagram = new AppFile(InstagramWindow);
const paypal = new AppFile(PaypalWindow);
const terminal = new AppFile(TerminalWindow);

const rootDir = new RootDir({
  users: new SystemDir({
    jason: new SystemDir({
      apps: new SystemDir({
        attribution,
        browser,
        finder,
        instagram,
        paypal,
        terminal,
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
        // version_history: ,
        attribution: new SymlinkFile(attribution),
      }, wallpaper),
    }),
  }),
});

export default rootDir;
