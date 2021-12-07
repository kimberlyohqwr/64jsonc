import React, { useContext, useRef, useState } from 'react';
import './stylesheet.scss';
import { Window } from 'components';
import { classes } from 'common/utils';
import { FileSystemContext } from 'contexts';
import { Link, SystemDirectory } from 'data/rootDir';
import { useHistory } from 'react-router-dom';

let sourceCode;
fetch('https://raw.githubusercontent.com/parkjs814/parkjs814.github.io/master/script.js')
  .then(response => response.text())
  .then(value => sourceCode = value);

function TerminalWindow({ windowProps, onUpdate, ...restProps }) {
  const { windowKey } = windowProps;

  const [rootDir, refreshRootDir] = useContext(FileSystemContext);
  const history = useHistory();

  const [currentDirectoryKeys, setCurrentDirectories] = useState(['users', 'jason', 'desktop']);

  const getPrompt = () => {
    const directories = [...currentDirectoryKeys];
    if (directories[0] === 'users' && directories[1] === 'jason') {
      directories.splice(0, 2, '~');
    }
    const path = directories.join('/') || '/';
    return `jason@world:${path}$ `;
  };

  const [inputHistory, setInputHistory] = useState([]);
  const [inputHistoryIndex, setInputHistoryIndex] = useState(0);
  const [tabPressed, setTabPressed] = useState(false);
  const [hackertyperLength, setHackertyperLength] = useState(null);
  const [text, setText] = useState('');
  const [inputs, setInputs] = useState(['']);
  const [cursorIndex, setCursorIndex] = useState(0);
  const isHackertyper = hackertyperLength !== null;

  const cursorRef = useRef(null);

  const flush = () => print('', { newLine: false });

  const print = (append, { flush = true, resetInput = true, newLine = true, wordBreak = false } = {}) => {
    const newText = text +
      (flush ? `${getPrompt()}${inputs.join('')}\n` : '') +
      (wordBreak ? '<span class="word-break">' : '') +
      (Array.isArray(append) ? append.join('\n') : append)
        .replace(/{(.+)}/g, '<span class="underline">$1</span>&nbsp;&nbsp;')
        .replace(/\*(.+)\*/g, '<span class="highlight">$1</span>') +
      (newLine ? '\n' : '') +
      (wordBreak ? '</span>' : '');
    setText(newText);
    if (resetInput) {
      setInputs(['']);
      setCursorIndex(0);
    }
  };

  const getDirectoryKeys = (pathArg) => {
    const tokens = pathArg ? pathArg.split('/') : [];
    let directoryKeys = [...currentDirectoryKeys];
    if (tokens[0] === '') {
      directoryKeys = [];
      tokens.shift();
    } else if (tokens[0] === '~') {
      directoryKeys = ['users', 'jason'];
      tokens.shift();
    }
    for (const token of tokens) {
      switch (token) {
        case '':
        case '.':
          break;
        case '..':
          directoryKeys.pop();
          break;
        default:
          directoryKeys.push(token);
          break;
      }
    }
    return directoryKeys;
  };

  const processCommand = input => {
    const [command, ...args] = input.split(/\s+/);
    const pathArgs = args.filter(arg => !arg.startsWith('-'));
    const optionArg = args.find(arg => arg.startsWith('-'));
    const options = optionArg ? optionArg.substring(1).split('') : [];
    switch (command) {
      case '': {
        flush();
        break;
      }
      case 'help': {
        print([
          ' *help*            show all the possible commands',
          ' *whoami* [-j]     display information about Jason',
          ' *cd* {dir}        change the working directory',
          ' *ls* {dir}        list directory contents',
          ' *pwd*             return the working directory',
          ' *rm* [-fr] {dir}  remove directory entries',
          ' *open* {files}    open the files',
          ' *clear*           clear the terminal screen',
          ' *exit*            close the terminal window',
          ' *hackertyper*     ?????',
        ]);
        break;
      }
      case 'whoami': {
        if (options.includes('j')) {
          window.open('https://www.instagram.com/jspark98/');
        } else {
          print([
            '*Jinseo Park* (Jason)',
            'A CS undergrad at Georgia Tech and a Software (and DevOps) Engineer at Prendssoin. Currently on an exchange program at National University of Singapore. Travelling on a regular basis is a necessity for him.',
            'Type "*whoami -j*" to show some snapshots of his journey.',
          ], { wordBreak: true });
        }
        break;
      }
      case 'cd': {
        const pathArg = pathArgs.shift();
        const directoryKeys = getDirectoryKeys(pathArg);
        const directory = rootDir.getChild(...directoryKeys);
        if (directory === undefined) {
          print(`-bash: ${command}: ${pathArg}: No such file or directory`);
          break;
        } else if (!directory.isDir()) {
          print(`-bash: ${command}: ${pathArg}: Not a directory`);
          break;
        }
        setCurrentDirectories(directoryKeys);
        flush();
        break;
      }
      case 'ls': {
        const pathArg = pathArgs.shift();
        const directoryKeys = getDirectoryKeys(pathArg);
        const directory = rootDir.getChild(...directoryKeys);
        if (directory === undefined) {
          print(`-bash: ${command}: ${pathArg}: No such file or directory`);
          break;
        } else if (!directory.isDir()) {
          print(`<span class="file">${directoryKeys.pop()}</span>`);
          break;
        }
        print(directory.getChildrenKeys().map(directoryKey => `<span class="${directory[directoryKey].isDir() ? 'dir' : 'file'}">${directoryKey}</span>`));
        break;
      }
      case 'pwd': {
        print('/' + currentDirectoryKeys.join('/'));
        break;
      }
      case 'rm': {
        const pathArg = pathArgs.shift();
        const directoryKeys = getDirectoryKeys(pathArg);
        const directory = rootDir.getChild(...directoryKeys);
        if (directory === undefined) {
          print(`-bash: ${command}: ${pathArg}: No such file or directory`);
          break;
        }
        if (directory.isDir() && !options.includes('r')) {
          print(`-bash: ${command}: ${pathArg}: Is a directory`);
          break;
        }
        // TODO: wildcard selector?
        if (directory instanceof SystemDirectory && !options.includes('f')) {
          print(`-bash: ${command}: ${pathArg}: Permission denied (try again with -f)`);
          break;
        }
        const directoryKey = directoryKeys.pop();
        delete rootDir.getChild(...directoryKeys)[directoryKey];
        refreshRootDir();
        flush();
        break;
      }
      case 'open': {
        const outputs = pathArgs.map((pathArg, i) => {
          const directoryKeys = getDirectoryKeys(pathArg);
          const directory = rootDir.getChild(...directoryKeys);
          if (directory === undefined) {
            return `The file /${directoryKeys.join('/')} does not exist.`;
          } else if (directory instanceof Link) {
            window.setTimeout(() => {
              window.open(directory.href);
            }, (i + 1) * 200);
          } else if (directoryKeys[0] === 'users' && directoryKeys[1] === 'jason' && directoryKeys[2] === 'desktop') {
            window.setTimeout(() => {
              history.push(`/${directoryKeys.splice(3).join('/')}`);
            }, (i + 1) * 200);
            return undefined;
          } else {
            return `-bash: ${command}: ${pathArg}: Permission denied`;
          }
        }).filter(v => v);
        if (outputs.length) {
          print(outputs);
        } else {
          flush();
        }
        break;
      }
      case 'clear': {
        setText('');
        setInputs(['']);
        setCursorIndex(0);
        break;
      }
      case 'exit': {
        history.push('/');
        onUpdate({ opened: false });
        break;
      }
      case 'hackertyper': {
        if (sourceCode) {
          setHackertyperLength(0);
          flush();
        } else {
          print(`Error occurred while loading source code.`);
        }
        break;
      }
      default: {
        print(`-bash: ${command}: command not found`);
      }
    }
  };

  return (
    <Window className="TerminalWindow" windowKey={windowKey} windowProps={windowProps} onUpdate={onUpdate}
            onKeyPress={e => {
              const keyCode = e.charCode || e.keyCode;
              if (keyCode === 3) {
                if (hackertyperLength === null) {
                  flush();
                } else {
                  setHackertyperLength(null);
                }
              } else if (keyCode >= 32) {
                if (hackertyperLength === null) {
                  const char = String.fromCharCode(keyCode);
                  if (char !== undefined) {
                    const newInputs = [...inputs];
                    newInputs.splice(cursorIndex, 0, char);
                    setInputs(newInputs);
                    setCursorIndex(cursorIndex + 1);
                  }
                } else {
                  if (hackertyperLength >= sourceCode.length) {
                    setHackertyperLength(null);
                  } else {
                    const chunkLength = (Math.random() * 8 | 0) + 1;
                    setHackertyperLength(hackertyperLength + chunkLength);
                  }
                }
              }
              cursorRef.current.scrollIntoView();
            }}
            onKeyDown={e => {
              const { keyCode } = e;
              switch (keyCode) {
                case 8:
                case 9:
                case 13:
                case 27:
                case 37:
                case 38:
                case 39:
                case 40:
                  e.preventDefault();
                  break;
              }
              if (hackertyperLength !== null && keyCode !== 27) return;
              switch (keyCode) {
                case 8: {
                  const newInputs = [...inputs];
                  const [removed] = newInputs.splice(cursorIndex - 1, 1);
                  if (removed) {
                    setInputs(newInputs);
                    setCursorIndex(cursorIndex - 1);
                  }
                  break;
                }
                case 9: {
                  if (cursorIndex === inputs.length - 1) {
                    const input = inputs.join('');
                    const incompletePathArg = input.split(/\s+/).pop();
                    const index = incompletePathArg.lastIndexOf('/');
                    const parentDirectory = incompletePathArg.substring(0, index + 1);
                    const incompleteDirectory = incompletePathArg.substring(index + 1);
                    const directoryKeys = getDirectoryKeys(parentDirectory);
                    const directory = rootDir.getChild(...directoryKeys);
                    if (directory) {
                      const possibleDirectories = directory.getChildrenKeys().filter(directoryKey => directoryKey.startsWith(incompleteDirectory));
                      if (possibleDirectories.length === 1) {
                        const directory = possibleDirectories[0];
                        const leftover = directory.substring(incompleteDirectory.length);
                        const newInputs = [...inputs];
                        newInputs.splice(-1, 0, ...Array.from(leftover));
                        setInputs(newInputs);
                        setCursorIndex(newInputs.length - 1);
                      } else if (possibleDirectories.length > 1) {
                        if (tabPressed) {
                          print(possibleDirectories.map(directoryKey => `<span class="${directory[directoryKey].isDir() ? 'dir' : 'file'}">${directoryKey}</span>`).join('\n'), { resetInput: false });
                        }
                        setTabPressed(true);
                      }
                    }
                  }
                  break;
                }
                case 13: {
                  const input = inputs.join('');
                  const newInputHistory = [...inputHistory, input];
                  setInputHistory(newInputHistory);
                  setInputHistoryIndex(newInputHistory.length);
                  processCommand(input);
                  break;
                }
                case 27: {
                  if (hackertyperLength === null) {
                    flush();
                  } else {
                    setHackertyperLength(null);
                  }
                  break;
                }
                case 37: {
                  if (cursorIndex > 0) {
                    setCursorIndex(cursorIndex - 1);
                  }
                  break;
                }
                case 39: {
                  if (cursorIndex < inputs.length - 1) {
                    setCursorIndex(cursorIndex + 1);
                  }
                  break;
                }
                case 38: {
                  if (inputHistoryIndex > 0) {
                    const input = inputHistory[inputHistoryIndex - 1];
                    const newInputs = [...Array.from(input), ''];
                    setInputs(newInputs);
                    setCursorIndex(newInputs.length - 1);
                    setInputHistoryIndex(inputHistoryIndex - 1);
                  }
                  break;
                }
                case 40: {
                  if (inputHistoryIndex < inputHistory.length) {
                    const input = inputHistory[inputHistoryIndex + 1] || '';
                    const newInputs = [...Array.from(input), ''];
                    setInputs(newInputs);
                    setCursorIndex(newInputs.length - 1);
                    setInputHistoryIndex(inputHistoryIndex + 1);
                  }
                  break;
                }
              }
              if (keyCode !== 9) {
                setTabPressed(false);
              }
              cursorRef.current.scrollIntoView();
            }}
            {...restProps}>
      {
        isHackertyper ? (
          <div className="line-container">
            {sourceCode.substring(0, hackertyperLength)}
            <span className={classes('input', 'cursor')} ref={cursorRef}/>
          </div>
        ) : (
          <div className="line-container">
            <span dangerouslySetInnerHTML={{ __html: text }}/>
            {getPrompt()}
            {
              inputs.map((input, i) => {
                const isCursor = i === cursorIndex;
                return (
                  <span key={i} className={classes('input', isCursor && 'cursor')}
                        ref={isCursor ? cursorRef : undefined}>{input}</span>
                );
              })
            }
          </div>
        )
      }
    </Window>
  );
}

export default TerminalWindow;
