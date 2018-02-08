using ReactNative.Bridge;
using ReactNative.Bridge.Queue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactNativeLocalization
{
    public class RNLocalizationModule : ReactContextNativeModuleBase, ILifecycleEventListener
    {
        private const String LANGUAGE = "language";

        public RNLocalizationModule(ReactContext reactContext)
            : base(reactContext)
        {

        }

        public override string Name => "ReactLocalization";

        public override IReadOnlyDictionary<string, object> Constants => new Dictionary<string, object>()
        {
            { LANGUAGE, GetCurrentLanguage() }
        };

        public void OnSuspend()
        {
        }

        public void OnResume()
        {
        }

        public void OnDestroy()
        {
        }

        private string GetCurrentLanguage()
        {
            return Windows.Globalization.Language.CurrentInputMethodLanguageTag;
        }

        [ReactMethod]
        public void getLanguage(ICallback callback)
        {
            var language = GetCurrentLanguage();

            if (callback != null)
            {
                callback.Invoke(null, language);
            }
        }
    }
}
