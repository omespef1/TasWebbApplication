var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var FingerprintAIOOriginal = /** @class */ (function (_super) {
    __extends(FingerprintAIOOriginal, _super);
    function FingerprintAIOOriginal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_UNKNOWN_ERROR = -100;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_UNAVAILABLE = -101;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_AUTHENTICATION_FAILED = -102;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_SDK_NOT_SUPPORTED = -103;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_HARDWARE_NOT_SUPPORTED = -104;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_PERMISSION_NOT_GRANTED = -105;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_NOT_ENROLLED = -106;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_INTERNAL_PLUGIN_ERROR = -107;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_DISMISSED = -108;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_PIN_OR_PATTERN_DISMISSED = -109;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_SCREEN_GUARD_UNSECURED = -110;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_LOCKED_OUT = -111;
        /**
         * Convenience constant
         * @type {number}
         */
        _this.BIOMETRIC_LOCKED_OUT_PERMANENT = -112;
        return _this;
    }
    FingerprintAIOOriginal.prototype.isAvailable = function () { return cordova(this, "isAvailable", {}, arguments); };
    FingerprintAIOOriginal.prototype.show = function (options) { return cordova(this, "show", {}, arguments); };
    FingerprintAIOOriginal.pluginName = "FingerprintAIO";
    FingerprintAIOOriginal.plugin = "cordova-plugin-fingerprint-aio";
    FingerprintAIOOriginal.pluginRef = "Fingerprint";
    FingerprintAIOOriginal.repo = "https://github.com/NiklasMerz/cordova-plugin-fingerprint-aio";
    FingerprintAIOOriginal.platforms = ["Android", "iOS"];
    return FingerprintAIOOriginal;
}(IonicNativePlugin));
var FingerprintAIO = new FingerprintAIOOriginal();
export { FingerprintAIO };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2ZpbmdlcnByaW50LWFpby9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQzs7SUFrRnBDLGtDQUFpQjs7O1FBRW5EOzs7V0FHRztRQUNILDZCQUF1QixHQUFHLENBQUMsR0FBRyxDQUFDO1FBQy9COzs7V0FHRztRQUNILDJCQUFxQixHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzdCOzs7V0FHRztRQUNILHFDQUErQixHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3ZDOzs7V0FHRztRQUNILGlDQUEyQixHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ25DOzs7V0FHRztRQUNILHNDQUFnQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3hDOzs7V0FHRztRQUNILHNDQUFnQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3hDOzs7V0FHRztRQUNILDRCQUFzQixHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzlCOzs7V0FHRztRQUNILHFDQUErQixHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3ZDOzs7V0FHRztRQUNILHlCQUFtQixHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzNCOzs7V0FHRztRQUNILHdDQUFrQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzFDOzs7V0FHRztRQUNILHNDQUFnQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3hDOzs7V0FHRztRQUNILDBCQUFvQixHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzVCOzs7V0FHRztRQUNILG9DQUE4QixHQUFHLENBQUMsR0FBRyxDQUFDOzs7SUFPdEMsb0NBQVc7SUFVWCw2QkFBSSxhQUFDLE9BQTJCOzs7Ozs7eUJBdEtsQztFQW1Gb0MsaUJBQWlCO1NBQXhDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBGaW5nZXJwcmludE9wdGlvbnMge1xuICAvKipcbiAgICogVGl0bGUgaW4gYmlvbWV0cmljIHByb21wdCAoYW5kcm9pZCBvbmx5KVxuICAgKiBAZGVmYXVsdCB7QVBQX05BTUV9IEJpb21ldHJpYyBTaWduIE9uXG4gICAqL1xuICB0aXRsZT86IHN0cmluZztcblxuICAvKipcbiAgICogU3VidGl0bGUgaW4gYmlvbWV0cmljIFByb21wdCAoYW5kcm9pZCBvbmx5KVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBzdWJ0aXRsZT86IHN0cmluZztcblxuICAvKipcbiAgICogRGVzY3JpcHRpb24gaW4gYmlvbWV0cmljIFByb21wdFxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcblxuICAvKipcbiAgICogVGl0bGUgb2YgZmFsbGJhY2sgYnV0dG9uLlxuICAgKiBAZGVmYXVsdCBcIlVzZSBQaW5cIlxuICAgKi9cbiAgZmFsbGJhY2tCdXR0b25UaXRsZT86IHN0cmluZztcblxuICAvKipcbiAgICogVGl0bGUgZm9yIGNhbmNlbCBidXR0b24gb24gQW5kcm9pZFxuICAgKiBAZGVmYXVsdCBcIkNhbmNlbFwiXG4gICAqL1xuICBjYW5jZWxCdXR0b25UaXRsZT86IHN0cmluZztcblxuICAvKipcbiAgICogRGlzYWJsZSAndXNlIGJhY2t1cCcgb3B0aW9uLlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGlzYWJsZUJhY2t1cD86IGJvb2xlYW47XG5cbn1cblxuLyoqXG4gKiBAbmFtZSBGaW5nZXJwcmludCBBSU9cbiAqIEBkZXNjcmlwdGlvblxuICogVXNlIHNpbXBsZSBmaW5nZXJwcmludCBhdXRoZW50aWNhdGlvbiBvbiBBbmRyb2lkIGFuZCBpT1MuXG4gKiBSZXF1aXJlcyBDb3Jkb3ZhIHBsdWdpbjogY29yZG92YS1wbHVnaW4tZmluZ2VycHJpbnQtYWlvLiBGb3IgbW9yZSBpbmZvIGFib3V0IHBsdWdpbiwgdmlzdDogaHR0cHM6Ly9naXRodWIuY29tL05pa2xhc01lcnovY29yZG92YS1wbHVnaW4tZmluZ2VycHJpbnQtYWlvXG4gKlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBGaW5nZXJwcmludEFJTyB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmluZ2VycHJpbnQtYWlvL25neCc7XG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBmYWlvOiBGaW5nZXJwcmludEFJTykgeyB9XG4gKlxuICogLi4uXG4gKlxuICogdGhpcy5mYWlvLnNob3coKS50aGVuKChyZXN1bHQ6IGFueSkgPT4gY29uc29sZS5sb2cocmVzdWx0KSkuY2F0Y2goKGVycm9yOiBhbnkpID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG4gKlxuICogIE9SIHdpdGggb3B0aW9ucy4uLlxuICpcbiAqIHRoaXMuZmFpby5zaG93KHtcbiAqICAgICB0aXRsZTogJ0Jpb21ldHJpYyBBdXRoZW50aWNhdGlvbicsIC8vIChBbmRyb2lkIE9ubHkpIHwgb3B0aW9uYWwgfCBEZWZhdWx0OiBcIjxBUFBfTkFNRT4gQmlvbWV0cmljIFNpZ24gT25cIlxuICogICAgIHN1YnRpdGxlOiAnQ29vbGVzdCBQbHVnaW4gZXZlcicgLy8gKEFuZHJvaWQgT25seSkgfCBvcHRpb25hbCB8IERlZmF1bHQ6IG51bGxcbiAqICAgICBkZXNjcmlwdGlvbjogJ1BsZWFzZSBhdXRoZW50aWNhdGUnIC8vIG9wdGlvbmFsIHwgRGVmYXVsdDogbnVsbFxuICogICAgIGZhbGxiYWNrQnV0dG9uVGl0bGU6ICdVc2UgQmFja3VwJywgLy8gb3B0aW9uYWwgfCBXaGVuIGRpc2FibGVCYWNrdXAgaXMgZmFsc2UgZGVmYXVsdHMgdG8gXCJVc2UgUGluXCIuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIGRpc2FibGVCYWNrdXAgaXMgdHJ1ZSBkZWZhdWx0cyB0byBcIkNhbmNlbFwiXG4gKiAgICAgZGlzYWJsZUJhY2t1cDp0cnVlLCAgLy8gb3B0aW9uYWwgfCBkZWZhdWx0OiBmYWxzZVxuICogfSlcbiAqIC50aGVuKChyZXN1bHQ6IGFueSkgPT4gY29uc29sZS5sb2cocmVzdWx0KSlcbiAqIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAqXG4gKiBgYGBcbiAqIEBpbnRlcmZhY2VzXG4gKiBGaW5nZXJwcmludE9wdGlvbnNcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdGaW5nZXJwcmludEFJTycsXG4gIHBsdWdpbjogJ2NvcmRvdmEtcGx1Z2luLWZpbmdlcnByaW50LWFpbycsXG4gIHBsdWdpblJlZjogJ0ZpbmdlcnByaW50JyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9OaWtsYXNNZXJ6L2NvcmRvdmEtcGx1Z2luLWZpbmdlcnByaW50LWFpbycsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ2lPUyddXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpbmdlcnByaW50QUlPIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBjb25zdGFudFxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgQklPTUVUUklDX1VOS05PV05fRVJST1IgPSAtMTAwO1xuICAvKipcbiAgICogQ29udmVuaWVuY2UgY29uc3RhbnRcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIEJJT01FVFJJQ19VTkFWQUlMQUJMRSA9IC0xMDE7XG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBjb25zdGFudFxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgQklPTUVUUklDX0FVVEhFTlRJQ0FUSU9OX0ZBSUxFRCA9IC0xMDI7XG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBjb25zdGFudFxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgQklPTUVUUklDX1NES19OT1RfU1VQUE9SVEVEID0gLTEwMztcbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIGNvbnN0YW50XG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBCSU9NRVRSSUNfSEFSRFdBUkVfTk9UX1NVUFBPUlRFRCA9IC0xMDQ7XG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBjb25zdGFudFxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgQklPTUVUUklDX1BFUk1JU1NJT05fTk9UX0dSQU5URUQgPSAtMTA1O1xuICAvKipcbiAgICogQ29udmVuaWVuY2UgY29uc3RhbnRcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIEJJT01FVFJJQ19OT1RfRU5ST0xMRUQgPSAtMTA2O1xuICAvKipcbiAgICogQ29udmVuaWVuY2UgY29uc3RhbnRcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIEJJT01FVFJJQ19JTlRFUk5BTF9QTFVHSU5fRVJST1IgPSAtMTA3O1xuICAvKipcbiAgICogQ29udmVuaWVuY2UgY29uc3RhbnRcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIEJJT01FVFJJQ19ESVNNSVNTRUQgPSAtMTA4O1xuICAvKipcbiAgICogQ29udmVuaWVuY2UgY29uc3RhbnRcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIEJJT01FVFJJQ19QSU5fT1JfUEFUVEVSTl9ESVNNSVNTRUQgPSAtMTA5O1xuICAvKipcbiAgICogQ29udmVuaWVuY2UgY29uc3RhbnRcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIEJJT01FVFJJQ19TQ1JFRU5fR1VBUkRfVU5TRUNVUkVEID0gLTExMDtcbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIGNvbnN0YW50XG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBCSU9NRVRSSUNfTE9DS0VEX09VVCA9IC0xMTE7XG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBjb25zdGFudFxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgQklPTUVUUklDX0xPQ0tFRF9PVVRfUEVSTUFORU5UID0gLTExMjtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgZmluZ2VycHJpbnQgYXV0aGVudGljYXRpb24gaXMgYXZhaWxhYmxlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn0gUmV0dXJucyBhIHByb21pc2Ugd2l0aCByZXN1bHRcbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgaXNBdmFpbGFibGUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBhdXRoZW50aWNhdGlvbiBkaWFsb2d1ZVxuICAgKiBAcGFyYW0ge0ZpbmdlcnByaW50T3B0aW9uc30gb3B0aW9ucyBPcHRpb25zIGZvciBwbGF0Zm9ybSBzcGVjaWZpYyBmaW5nZXJwcmludCBBUElcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gYXV0aGVudGljYXRpb24gd2FzIHN1Y2Nlc3NmdWxcbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgc2hvdyhvcHRpb25zOiBGaW5nZXJwcmludE9wdGlvbnMpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19