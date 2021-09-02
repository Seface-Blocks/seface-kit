class Utils {
  
  /**
   * Returns if a file has a valid extension.
   * 
   * @param file The file name.
   * @param extensions The valid extensions.
   * */
  public checkFileExtension(file: string, extensions: string[]): boolean {
    if(extensions.includes(file.substr(file.lastIndexOf('.')))) {
      return true;
    }

    return false;
  }
}

export default new Utils();
