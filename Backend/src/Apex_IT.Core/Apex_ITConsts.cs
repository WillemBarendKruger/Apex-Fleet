using Apex_IT.Debugging;

namespace Apex_IT
{
    public class Apex_ITConsts
    {
        public const string LocalizationSourceName = "Apex_IT";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "8e0172340d2e4c348b6156b42a072471";
    }
}
