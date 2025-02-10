"use strict";
// Porting BY EMI INDO with c3addon-ide-plus
{
    const SDK = globalThis.SDK;

    const PLUGIN_ID = "EMI_INDO_IDFA_AAID";
    // callMap Deprecated const PLUGIN_VERSION = "1.0.0.0";
    const PLUGIN_CATEGORY = "platform-specific";

    const PLUGIN_CLASS = SDK.Plugins.EMI_INDO_IDFA_AAID = class IDFA_AAIDPlugin extends SDK.IPluginBase {
        constructor() {
            super(PLUGIN_ID);

            SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());

            this._info.SetName(globalThis.lang(".name"));
            this._info.SetDescription(globalThis.lang(".description"));
            // callMap Deprecated this._info.SetVersion(PLUGIN_VERSION);
            this._info.SetCategory(PLUGIN_CATEGORY);
            this._info.SetAuthor("EMI_INDO");
            this._info.SetHelpUrl(globalThis.lang(".help-url"));
            this._info.SetRuntimeModuleMainScript("c3runtime/main.js");
            this._info.SetIsSingleGlobal(true);
            this._info.SetCanBeBundled(true);

            this._info.SetSupportedRuntimes(["c3"]);

            this._info.SetAndroidXEnabled(true);

            const PLAYSERVICESVERSION = new SDK.PluginProperty("text", "ANDROID-PLAY-ADID-VERSION", "17.+");

            SDK.Lang.PushContext(".properties");

            this._info.SetProperties([
                PLAYSERVICESVERSION
            ]);

            this._info.AddCordovaPluginReference(
                {
                    id: "cordova-plugin-idfa",
                    plugin: this,
                    variables: [
                        ["ANDROID_PLAY_ADID_VERSION", PLAYSERVICESVERSION],
                    ]
                });


            SDK.Lang.PopContext(); //.properties
            SDK.Lang.PopContext();
        }
    };

    PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}