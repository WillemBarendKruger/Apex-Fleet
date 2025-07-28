using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace Apex_IT.Localization
{
    public static class Apex_ITLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(Apex_ITConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(Apex_ITLocalizationConfigurer).GetAssembly(),
                        "Apex_IT.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
