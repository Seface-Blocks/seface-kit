class SefaceKitUtils {
  
  public checkFileExtension(file: string, extensions: string[]): boolean {
    if(extensions.includes(file.substr(file.lastIndexOf('.')))) {
      return true;
    }

    return false;
  }
}

export default new SefaceKitUtils();
