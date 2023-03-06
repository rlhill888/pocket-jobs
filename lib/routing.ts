export function queryIdFromUrl(str: String) {
    const lastIndex = str.lastIndexOf('/');
    if (lastIndex === -1) {
      // if there's no slash in the string, return the original string
      return str;
    }
    // otherwise, return the substring after the last slash
    return str.substr(lastIndex + 1).trim();
  }