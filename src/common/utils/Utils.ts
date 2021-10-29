class Utils {
  
  /** Return a boolean values if the current file has some of extensions. */
  public checkFileExtension(file: string, extensions: string[]): boolean {
    if(extensions.includes(file.substr(file.lastIndexOf('.')))) {
      return true;
    }

    return false;
  }
}

export default new Utils();
