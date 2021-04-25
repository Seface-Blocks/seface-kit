class Utils {

  /** Returns if a file has a valid extension. */
  public checkFileExtension(file: string, extensions: string[]): boolean {
    return extensions.includes(file.substr(file.lastIndexOf('.')));
  }
}

export default new Utils();
