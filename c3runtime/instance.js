"use strict";
{
    // Porting BY EMI INDO with c3addon-ide-plus

    globalThis.C3.Plugins.EMI_INDO_IDFA_AAID.Instance = class IDFA_AAIDInstance extends globalThis.ISDKInstanceBase {
        constructor() {
            super();

            const properties = this._getInitProperties();


            if (properties) { }


            if (typeof cordova == 'undefined') {
                return;
            }
            else { };

            this.EMI_INDO = globalThis.C3.Plugins.EMI_INDO_IDFA_AAID.Cnds;

            this.res = "";

            const self = this;

            const getInfo = async () => {
                const idfaPlugin = cordova.plugins.idfa;

                await idfaPlugin.getInfo()
                    .then(info => {
                        if (!info.trackingLimited) {
                            return info.idfa || info.aaid;
                        }
                        else if (info.trackingPermission === idfaPlugin.TRACKING_PERMISSION_NOT_DETERMINED) {
                            self._trigger(self.EMI_INDO.Tracking_Not)
                            return idfaPlugin.requestPermission().then(result => {
                                if (result === idfaPlugin.TRACKING_PERMISSION_NOT_DETERMINED) {
                                    self._trigger(self.EMI_INDO.Permission_Not_Determined)
                                }
                                else if (result === idfaPlugin.TRACKING_PERMISSION_RESTRICTED) {
                                    self._trigger(self.EMI_INDO.Permission_Restricted)

                                }
                                else if (result === idfaPlugin.TRACKING_PERMISSION_DENIED) {
                                    self._trigger(self.EMI_INDO.Permission_Denied)

                                }
                                else if (result === idfaPlugin.TRACKING_PERMISSION_AUTHORIZED) {
                                    self._trigger(self.EMI_INDO.Permission_Authorized)

                                    return idfaPlugin.getInfo().then(info => {
                                        return info.idfa || info.aaid;
                                    });
                                }
                            });
                        }
                    })
                    .then(idfaOrAaid => {
                        if (idfaOrAaid) {
                            self.res = (idfaOrAaid)
                            self._trigger(self.EMI_INDO.Idfaoraaid)
                        }
                    });

            }

            this.getInfo = getInfo;



        }

        _release() {
            super._release();
        }

        _saveToJson() {
            return {
                // data to be saved for savegames
            };
        }

        _loadFromJson(o) {
            // load state for savegames
        }


    };
}