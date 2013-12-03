using System;
using Coevery.Caching;
using Coevery.Environment.Configuration;
using Coevery.Environment.Descriptor;
using Coevery.Environment.Descriptor.Models;
using Coevery.FileSystems.AppData;
using Coevery.Logging;

namespace Coevery.Environment {
    public interface IHostLocalRestart {
        /// <summary>
        /// Monitor changes on the persistent storage.
        /// </summary>
        void Monitor(Action<IVolatileToken> monitor);
    }

    public class DefaultHostLocalRestart : IHostLocalRestart, IShellDescriptorManagerEventHandler, IShellSettingsManagerEventHandler {
        private readonly IAppDataFolder _appDataFolder;
        private const string fileName = "hrestart.txt";

        public DefaultHostLocalRestart(IAppDataFolder appDataFolder) {
            _appDataFolder = appDataFolder;
            Logger = NullLogger.Instance;
        }

        public ILogger Logger { get; set; }

        public void Monitor(Action<IVolatileToken> monitor) {
            if (!_appDataFolder.FileExists(fileName))
                TouchFile();

            Logger.Debug("Monitoring virtual path \"{0}\"", fileName);
            monitor(_appDataFolder.WhenPathChanges(fileName));
        }

        void IShellSettingsManagerEventHandler.Saved(ShellSettings settings) {
            //TouchFile();
        }

        void IShellDescriptorManagerEventHandler.Changed(ShellDescriptor descriptor, string tenant) {
            //TouchFile();
        }

        private void TouchFile() {
            try {
                _appDataFolder.CreateFile(fileName, "Host Restart");
            }
            catch(Exception e) {
                Logger.Warning(e, "Error updating file '{0}'", fileName);
            }
        }
    }
}