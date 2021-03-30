#!/usr/bin/env node

//
// This hook copies various resource files from our version control system directories into the appropriate platform specific location
// taken from http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/


// configure all the files to copy.  Key of object is the source file, value is the destination location.  It's fine to put all platforms' icons and splash screen files here, even if we don't build for all platforms on each developer's box.
var filestocopy = [{
    "resources/android/icon/statusBarIcon_android_18x18_120dpi.png": "platforms/android/res/drawable-ldpi/ic_popup_reminder.png"
  },{
    "resources/android/icon/statusBarIcon_android_24x24_160dpi.png": "platforms/android/res/drawable-mdpi/ic_popup_reminder.png"
  },{
    "resources/android/icon/statusBarIcon_android_36x36_240dpi.png": "platforms/android/res/drawable-hdpi/ic_popup_reminder.png"
  },{
    "resources/android/icon/statusBarIcon_android_48x48_320dpi.png": "platforms/android/res/drawable-xhdpi/ic_popup_reminder.png"
},];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

if (fs.existsSync(path.join(rootdir, 'platforms/android'))) {
  filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
      var val = obj[key];
      var srcfile = path.join(rootdir, key);
      var destfile = path.join(rootdir, val);
      //console.log("copying "+srcfile+" to "+destfile);
      var destdir = path.dirname(destfile);
      if (!fs.existsSync(destdir)) {
        fs.mkdirSync(destdir);
      }
      if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
          fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
      }
    });
  });
}
