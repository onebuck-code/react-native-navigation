// @ts-check
var path = require('./path');
var fs = require("fs");
var {logn, debugn, infon} = require("./log");

class PodfileLinker {
  constructor() {
    this.podfilePath = path.podFile;
  }

  link() {
    if (this.podfilePath) {
      logn("Updating Podfile...")
      var podfileContent = fs.readFileSync(this.podfilePath, "utf8");

      podfileContent = this._removeRNNPodLink(podfileContent);

      fs.writeFileSync(this.podfilePath, podfileContent);
      infon("Podfile updated successfully!\n")
    }
  }

  /**
   * Removes the RNN pod added by react-native link script. 
   */
  _removeRNNPodLink(contents) {
    const rnnPodLink  = contents.match(/\s+.*pod 'ReactNativeNavigation'.+react-native-navigation'/)

    if (!rnnPodLink) {
      debugn("   RNN Pod has not been added to Podfile")
      return contents
    }

    debugn("   Removing RNN Pod from Podfile")
    return contents.replace(rnnPodLink, "")    
  }
}

module.exports = PodfileLinker