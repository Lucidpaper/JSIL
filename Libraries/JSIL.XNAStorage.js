"use strict";

if (typeof (JSIL) === "undefined")
  throw new Error("JSIL.Core required");

if (typeof ($jsilxna) === "undefined")
  throw new Error("JSIL.XNACore required");

if (typeof ($jsilstorage) === "undefined")
  throw new Error("JSIL.Storage required");

JSIL.ImplementExternals("Microsoft.Xna.Framework.Storage.StorageContainer", function ($) {

  $.Method({Static:false, Public:false}, ".ctor", 
    (new JSIL.MethodSignature(null, [
          $xnaasms.xnaStorage.TypeRef("Microsoft.Xna.Framework.Storage.StorageDevice"), $xnaasms.xna.TypeRef("Microsoft.Xna.Framework.PlayerIndex"), 
          $.String
        ], [])), 
    function _ctor (device, index, displayName) {
      this.device = device;
      this.index = index;
      this.displayName = displayName;

      var volumes = JSIL.GetStorageVolumes();
      if (volumes.length > 0) {
        this.volume = volumes[0];
      }
    }
  );

  $.Method({Static:false, Public:true }, "add_Disposing", 
    (new JSIL.MethodSignature(null, [$xnaasms.corlib.TypeRef("System.EventHandler`1", [$xnaasms.corlib.TypeRef("System.EventArgs")])], [])), 
    function add_Disposing (value) {
      // FIXME
    }
  );

  $.Method({Static:false, Public:true }, "CreateDirectory", 
    (new JSIL.MethodSignature(null, [$.String], [])), 
    function CreateDirectory (directory) {
      if (!this.volume)
        throw new Error("No storage providers loaded");

      this.volume.createDirectory(directory);
    }
  );

  $.Method({Static:false, Public:true }, "CreateFile", 
    (new JSIL.MethodSignature($xnaasms.corlib.TypeRef("System.IO.Stream"), [$.String], [])), 
    function CreateFile (file) {
      if (!this.volume)
        throw new Error("No storage providers loaded");
      
      this.volume.createFile(file, true);
      return this.OpenFileInternal(file);
    }
  );

  $.Method({Static:false, Public:true }, "DeleteDirectory", 
    (new JSIL.MethodSignature(null, [$.String], [])), 
    function DeleteDirectory (directory) {
      throw new Error('Not implemented');
    }
  );

  $.Method({Static:false, Public:true }, "DeleteFile", 
    (new JSIL.MethodSignature(null, [$.String], [])), 
    function DeleteFile (file) {
      throw new Error('Not implemented');
    }
  );

  $.Method({Static:false, Public:true }, "DirectoryExists", 
    (new JSIL.MethodSignature($.Boolean, [$.String], [])), 
    function DirectoryExists (directory) {
      if (this.volume) {
        var directory = this.volume.resolvePath(directory, false);
        return (directory !== null);
      }

      return false;
    }
  );

  $.Method({Static:false, Public:true }, "Dispose", 
    (new JSIL.MethodSignature(null, [], [])), 
    function Dispose () {
      // FIXME

      if (this.volume)
        this.volume.flush();
    }
  );

  $.Method({Static:false, Public:false}, "Dispose", 
    (new JSIL.MethodSignature(null, [$.Boolean], [])), 
    function Dispose (disposing) {
      // FIXME
      
      if (this.volume)
        this.volume.flush();
    }
  );

  $.Method({Static:false, Public:false}, "DisposeOverride", 
    (new JSIL.MethodSignature(null, [$.Boolean], [])), 
    function DisposeOverride (disposing) {
      // FIXME
    }
  );

  $.Method({Static:false, Public:true }, "FileExists", 
    (new JSIL.MethodSignature($.Boolean, [$.String], [])), 
    function FileExists (file) {
      if (this.volume) {
        var file = this.volume.resolvePath(file, false);
        return (file !== null);
      }
      
      // FIXME
      return false;
    }
  );

  $.Method({Static:false, Public:true }, "get_DisplayName", 
    (new JSIL.MethodSignature($.String, [], [])), 
    function get_DisplayName () {
      return this.displayName;
    }
  );

  $.Method({Static:false, Public:true }, "get_IsDisposed", 
    (new JSIL.MethodSignature($.Boolean, [], [])), 
    function get_IsDisposed () {
      // FIXME
      return false;
    }
  );

  $.Method({Static:false, Public:true }, "get_StorageDevice", 
    (new JSIL.MethodSignature($xnaasms.xnaStorage.TypeRef("Microsoft.Xna.Framework.Storage.StorageDevice"), [], [])), 
    function get_StorageDevice () {
      return this.device;
    }
  );

  $.Method({Static:false, Public:true }, "GetDirectoryNames", 
    (new JSIL.MethodSignature($jsilcore.TypeRef("System.Array", [$.String]), [], [])), 
    function GetDirectoryNames () {
      throw new Error('Not implemented');
    }
  );

  $.Method({Static:false, Public:true }, "GetDirectoryNames", 
    (new JSIL.MethodSignature($jsilcore.TypeRef("System.Array", [$.String]), [$.String], [])), 
    function GetDirectoryNames (searchPattern) {
      throw new Error('Not implemented');
    }
  );

  $.Method({Static:false, Public:true }, "GetFileNames", 
    (new JSIL.MethodSignature($jsilcore.TypeRef("System.Array", [$.String]), [], [])), 
    function GetFileNames () {
      throw new Error('Not implemented');
    }
  );

  $.Method({Static:false, Public:true }, "GetFileNames", 
    (new JSIL.MethodSignature($jsilcore.TypeRef("System.Array", [$.String]), [$.String], [])), 
    function GetFileNames (searchPattern) {
      throw new Error('Not implemented');
    }
  );

  $.RawMethod(false, "OpenFileInternal", function (filename) {
    if (!this.volume)
      throw new Error("No storage providers loaded");

    var file = this.volume.resolvePath(filename, true);

    var fileStream = JSIL.CreateInstanceOfType(
      System.IO.FileStream.__Type__, "$fromVirtualFile", [file]
    );

    return fileStream;
  });

  $.Method({Static:false, Public:true }, "OpenFile", 
    (new JSIL.MethodSignature($xnaasms.corlib.TypeRef("System.IO.Stream"), [$.String, $xnaasms.corlib.TypeRef("System.IO.FileMode")], [])), 
    function OpenFile (file, fileMode) {
      return this.OpenFileInternal(file);
    }
  );

  $.Method({Static:false, Public:true }, "OpenFile", 
    (new JSIL.MethodSignature($xnaasms.corlib.TypeRef("System.IO.Stream"), [
          $.String, $xnaasms.corlib.TypeRef("System.IO.FileMode"), 
          $xnaasms.corlib.TypeRef("System.IO.FileAccess")
        ], [])), 
    function OpenFile (file, fileMode, fileAccess) {
      return this.OpenFileInternal(file);
    }
  );

  $.Method({Static:false, Public:true }, "OpenFile", 
    (new JSIL.MethodSignature($xnaasms.corlib.TypeRef("System.IO.Stream"), [
          $.String, $xnaasms.corlib.TypeRef("System.IO.FileMode"), 
          $xnaasms.corlib.TypeRef("System.IO.FileAccess"), $xnaasms.corlib.TypeRef("System.IO.FileShare")
        ], [])), 
    function OpenFile (file, fileMode, fileAccess, fileShare) {
      return this.OpenFileInternal(file);
    }
  );

  $.Method({Static:false, Public:true }, "remove_Disposing", 
    (new JSIL.MethodSignature(null, [$xnaasms.corlib.TypeRef("System.EventHandler`1", [$xnaasms.corlib.TypeRef("System.EventArgs")])], [])), 
    function remove_Disposing (value) {
      // FIXME
    }
  );

});