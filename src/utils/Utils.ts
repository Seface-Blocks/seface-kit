import SefaceKit from '..';

class Utils extends SefaceKit {
  
  /**
   * Returns if a file is has valid extension.
   * 
   * @param file The file name.
   * @param extensions The valid extensions.
   * */
  public checkFileExtension(file: string, extensions: string[]): boolean {
    if(extensions.includes(file.substr(file.lastIndexOf('.')))) {
      return true;
    }

    if(this.options.showWarns) {
      console.warn(`The file ${file} has an invalid extension.`);
    }

    return false;
  }
}

export default new Utils();
